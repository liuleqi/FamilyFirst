var Calendar = function(config){
	if (config.loadDate=="") {
	    this.loadDate = this.nowDate();
	} else {
	    this.loadDate = config.loadDate;
	}

	this.weekList = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	this.init();
}
Calendar.prototype = {
	init : function(){
		var entity = this;
		
		// init widget
		entity.initWidget()
		// init weekview
		entity.initWeekView();

		entity.loadWeekActivity();
	},
	// init widget
	initWidget: function() {
		var entity = this;
		$("#widget").remove();
		var widget = '<div id="widget-title" class="widget">';
		
		widget = widget + '<form method="get" action="share_event.php" style="display: inline-block;float: right;margin-right:30px"><select id="share_user" name="share_user"></select><input type="submit" value="share" /></form>';
		
		
		
		widget = widget + '<form method="get" action="index.php" style="display: inline-block;float: right;margin-right:30px"><input type="date" id="searchDate" name="searchDate" style="border: 1px solid black;" value="' + entity.loadDate + '"/><input type="submit" value="search" /></form>';
		
		widget = widget + '</div>';
		$(widget).appendTo($("#calendar"));
		
		entity.loadUsers();
	},
	
	// init weekview
	initWeekView : function(){
		var entity = this;
		entity.clear();
		$(".monthTable").remove();

		var id = entity.random();
		var timeTable = '<table id="'+id+'" class="timeTable"></table>';
		$(timeTable).appendTo($("#calendar"));
		var table_weeks = [];
	    table_weeks.push('<tr class="table_weeks" id="table_weeks">');
	    table_weeks.push('<td rowspan="2" class="week-title"></td>');
	    for(var i=0;i<7;i++){
	    	table_weeks.push('<td class="week-day"></td>');
	    }
	    table_weeks.push('</tr>');
	
		
		$(table_weeks.join('')).appendTo($("#"+id));
		$('<tr class="headBottomLine" id="headBottomLine"><td colspan="8"></td></tr>').appendTo($("#"+id));
		var parentWidth = $("#calendar").width();
		$("td.week-day").each(function(){
			var width = (parentWidth-$("td.week-title").width())/7;
			$(this).width(width);
		});

		var table_time = [];
		for(var i=0;i<24*2;i++){
			var time_day = [];
			time_day.push('<tr id="'+i+'" class="time-row">');
			if(i%2==0){
			time_day.push('<td rowspan="2" class="time-title"></td>');
			}
			for(var j=0;j<7;j++){
				time_day.push('<td class="timeItem"></td>');
			}
			time_day.push('</tr>');
			table_time.push(time_day.join(''));
		}
		$(table_time.join('')).appendTo($("#"+id));
		$("table.timeTable").find("tr").each(function(){
			var id = $(this).attr("id");
			if(id>=0){
				if(id%2==0){
					$(this).addClass("solid");
				}
				if(id%2==1&&!$(this).is(".solid")){
					$(this).addClass("dotted");
				}
			}
		});
		
		var activityDate = entity.dayByWeek(entity.loadDate);
		var startDate = activityDate.firstDayOfThisWeek.year+'-'+activityDate.firstDayOfThisWeek.month+'-'+activityDate.firstDayOfThisWeek.day;
		var endDate = activityDate.lastDayOfThisWeek.year+'-'+activityDate.lastDayOfThisWeek.month+'-'+activityDate.lastDayOfThisWeek.day;
		$('<span>'+startDate+' ~ '+endDate+'</span>').appendTo($("#widget-title"));
		
		var timeParam = {};
			timeParam.startDate = activityDate.firstDayOfThisWeek.year+"-"+activityDate.firstDayOfThisWeek.month+"-"+activityDate.firstDayOfThisWeek.day;
			timeParam.endDate = activityDate.lastDayOfThisWeek.year+"-"+activityDate.lastDayOfThisWeek.month+"-"+activityDate.lastDayOfThisWeek.day;
		entity.timeParam = timeParam;

		var items = activityDate.items;
		var i=0;
		$("td.week-day").each(function(){
			var day = items[i];
			var title = day.month+'/'+day.day+'('+day.weekDay+')';
			$(this).text(title);
			i++;
		});

		var i=0;
		$("td.time-title").each(function(){
			var time;
			if(i<12){
				time = i + ':00 am';
			}else {
				time = i + ':00 pm';
			}
			$(this).text(time);
			i++;
		});

		var today = activityDate.today;
		var index = today.dayOfThisWeek;
		entity.setTodayBackground(index);

		var isPress = false;
		var flag = 0;
		var timeParam = {};
		var selectItemId;
		var startTdInfo = null;
		$('body').mousedown(function(e){
			if(e.which!=1){
				return false;
			}
			isPress = true;
			flag = 0;
		}).mouseup(function(){
			isPress = false;
			if(startTdInfo==null){
				return false;
			}

			var popItemId = entity.popItem();
	
			var position = {};
			position.left = startTdInfo.left;
			position.top = startTdInfo.top;
			entity.setPopItemPosition(position, popItemId);
			var timeTile = timeParam.startDate.year + "-" + timeParam.startDate.month+"-"+timeParam.startDate.day+"("+timeParam.startDate.weekDay+"),"+" "+timeParam.startTime.fullTime+"-"+timeParam.endTime.fullTime;
			entity.activityAddItem(popItemId,timeTile,selectItemId);
			timeParam= {};
			startTdInfo = null;
		});
		$("td.timeItem").mousemove(function(){
			if(isPress){
				if(flag==0){
		
					entity.clear();
					var id = parseInt($(this).parent().attr("id"));
					console.log(id);
					var startTime = entity.idToTime(id);
					var endTime = entity.idToTime(id+1);
			
					selectItemId = entity.selectItem();
					var tdInfo = entity.getTdInfo($(this));
					startTdInfo = tdInfo;
					startTdInfo.top = tdInfo.top;
			
					$("#"+selectItemId).css({left:tdInfo.left+'px',top:tdInfo.top+'px'});
					$("#"+selectItemId).width(tdInfo.width+1);
					$("#"+selectItemId+" .content").height(tdInfo.height-3-15);
					$("#"+selectItemId+" .head").text(startTime.fullTime+"-"+endTime.fullTime);
					var today = items[tdInfo.index];
					timeParam.startDate = today;
					timeParam.endDate = today;
					timeParam.startTime = startTime;
					timeParam.endTime = endTime;
					entity.timeParam = timeParam;
				}else if(flag==1){
					var id = parseInt($(this).parent().attr("id"));
					var endTime = entity.idToTime(id+1);
					var tdInfo = entity.getTdInfo($(this));
					var height = tdInfo.top-startTdInfo.top+tdInfo.height+1-3-3-15;
					$("#"+selectItemId+" .content").height(height);
					timeParam.endTime = endTime;
					entity.timeParam = timeParam;
				
					var time = entity.timeParam.startTime.fullTime+"-"+entity.timeParam.endTime.fullTime;
					if(entity.timeParam.startTime.fullTime==entity.timeParam.endTime.fullTime){
						time = entity.timeParam.startTime.fullTime;
					}
					$("#"+selectItemId+" .head").text(time);
				}
				flag =1;
			}
		});
	},
	
	//get week list by day
	dayByWeek : function(date){
		var entity = this;
		var weeks = entity.weekList;
		var activityDate = {};
		var dateArray = date.split("-");
		var year = dateArray[0];
		var month = dateArray[1].replace("0","");
		var day = dateArray[2];
		var newDate = new Date(year,parseInt(month)-1,day);
		var newDay = newDate.getDate();
		var onWeekDay = newDate.getDay();
		var today = {};
		today.year = year;
		today.month = month;
		today.day = day;
		today.dayOfThisWeek = onWeekDay;
		activityDate.today = today;

		newDate.setDate(newDay-onWeekDay);
		var firstDayOfThisWeek = {}; 
		firstDayOfThisWeek.year = newDate.getFullYear();
		firstDayOfThisWeek.month = parseInt(newDate.getMonth())+1;
		firstDayOfThisWeek.day = newDate.getDate();
		activityDate.firstDayOfThisWeek = firstDayOfThisWeek;
   
		newDate = new Date(year,parseInt(month)-1,day);
		newDate.setDate(newDay-onWeekDay+6);
		var lastDayOfThisWeek = {};
		lastDayOfThisWeek.year = newDate.getFullYear();
		lastDayOfThisWeek.month = parseInt(newDate.getMonth())+1;
		lastDayOfThisWeek.day = newDate.getDate();
		activityDate.lastDayOfThisWeek = lastDayOfThisWeek;

		var thisMonthDays = new Date(year,parseInt(month)-1,0);
		activityDate.thisMonthDays = thisMonthDays.getDate();

		var items = [];
		for(var i=0;i<7;i++){
			var itemDate = new Date(year,parseInt(month)-1,day);
			var itemDay = itemDate.getDate();
			var itemOnWeekDay = itemDate.getDay();
			itemDate.setDate(itemDay-itemOnWeekDay+i);
			var dayItem = {};
			dayItem.year = itemDate.getFullYear();
			dayItem.month = parseInt(itemDate.getMonth())+1;
			dayItem.day = itemDate.getDate();
			dayItem.weekDay = weeks[i];
			items[i]= dayItem;
		}
		activityDate.items = items;
		return activityDate;
	},
	
	
	setTodayBackground : function(index){
		$("td.week-day").eq(index).addClass("thisDayHead");
		$("td.oneDay").eq(index).addClass("thisDay");
		$("tr.time-row").each(function(){
			var trInfo = $(this);
			var tdIndex;
			if(trInfo.is(".solid"))
				tdIndex = index+1;
			else 
				tdIndex = index;
			trInfo.find("td").eq(tdIndex).addClass("thisDay");
		});
	},

	selectItem : function(){
		var entity = this;
		var id = this.random();
		var div = [];
			div.push('<div id="'+id+'" class="selectItem temp">');
			div.push('<table><tr><td class="TL"></td><td class="TC"></td><td class="TR"></td></tr></table>');
			div.push('<div id="head" class="head"></div>');
			div.push('<div id="content" class="content"><table><tr><td></td></tr></table></div>');
			div.push('<table><tr><td class="BL"></td><td class="BC"></td><td class="BR"></td></tr></table>');
			div.push('</div>');
			$(div.join('')).appendTo($("#calendar"));
		return id;	
	},

	popItem : function(){
		var entity = this;
		var id = this.random();
		var div = '<div id="'+id+'" class="popItem temp"><div class="close"></div>'
			 + '<table><tr><td class="TL"></td><td class="TC"></td><td class="TR"></td></tr>'
			 + '<tr><td class="ML"></td><td class="MC"></td><td class="MR"></td></tr>'
			 + '<tr><td class="BL"></td><td class="BC"></td><td class="BR"></td></tr>'
			 + '</table>'
			 + '</div>';
		$(div).appendTo($("#calendar"));
		$('<div id="vPic" class="vPic temp"></div>').appendTo($("#calendar"));
		
		$("#"+id+" .close").click(function(){
			entity.clear();
		});
		return id;
	},
	

	setPopItemPosition : function(position,popItemId){
		var left = position.left-50;
		var top = position.top-230;
		if(top<=0){
			top=0;
			$("#vPic").css("display","none");
		}
		if((left+410)>$("body").width()){
			left=$("body").width()-410;
			$("#vPic").css("display","none");
		}
		if(left<=0){
			left=0;
			$("#vPic").css("display","none");
		}
		$("#"+popItemId).css({left:left+'px',top:top+'px'});
		$("#vPic").css({left:(left+100)+'px',top:(top+135)+'px'});
	},

	isNull : function(data){
		console.log(data)
		console.log(data == "")
		if(data==null){
			return true;
		}else {
			return false;
		}
	},

	idToTime : function(id){
		var entity = this;
		if(entity.isNull(id)){
			alert('id错误');
			return;
		}
		var hour = parseInt(id)/2;
		var second = parseInt(id)%2;
	
		var time = {};
		time.timeId = id;
		time.hour = parseInt(hour);
		time.second = second;
		if(second==0){
			time.fullTime = parseInt(hour)+":00";
		}else if(second==1){
			time.fullTime = parseInt(hour)+":30";
		}
		return time;
	},

	strToTime : function(time){
		var entity = this;
		time = time.replace("-0","-");
		var dateStr = time.replace(/[-:\s.]/g,",");
		var dateArray = dateStr.split(",");
		var date;
		if(dateArray.length==3){
		date  = new Date(dateArray[0],parseInt(dateArray[1])-1,dateArray[2]);
		}else {
		date  = new Date(dateArray[0],parseInt(dateArray[1])-1,dateArray[2],dateArray[3],dateArray[4]);
		}
		var year = date.getFullYear();
		var month = parseInt(date.getMonth())+1;
		var day = date.getDate();
		var hour = date.getHours();
		var minute = date.getMinutes();
		var dayOfThisWeek = date.getDay();
		var hour_id = parseInt(hour)*2;
		var minute_id = parseInt(parseInt(minute)/30);
		var minute_px = parseInt(minute)%30;
		var timeTd = {};
			timeTd.year = year;
			timeTd.month = month;
			timeTd.day = day;
			timeTd.hour = hour;
			timeTd.minute = minute==0?'00':minute;
			timeTd.minutes = minute;
			timeTd.trId = hour_id+minute_id;
			timeTd.px = minute_px;
			timeTd.dayOfThisWeek = dayOfThisWeek;
		return timeTd;
	},

	getTdInfo : function(item){
		var tdInfo = {};
		tdInfo.width = item.width();
		tdInfo.height = item.height();
		tdInfo.left = item.offset().left;
		tdInfo.top = item.offset().top;
		if(item.parent().is(".solid")){
			tdInfo.index = item.index()-1;
		}else {
			tdInfo.index = item.index();
		}
		return tdInfo;
	},

	activityAddItem : function(popItemId,time,selectItemId){
		var entity = this;
		var item = [];
		item.push('<div>');
		item.push('<table class="contentTable"><tr><td class="label">Time：</td><td class="time">'+time+'</td></tr><tr><td class="label">Content：</td><td><input type="text" class="text" /></td></tr></table>');
		item.push('<div class="operate"><div id="createButton" class="createButton">Create</div></div>');
		item.push('</div>');
		$(item.join('')).appendTo($("#"+popItemId+" .MC"));
		$("#createButton").click(function(){
			var val = $("#"+popItemId+" .text").val();
			var param = "activity.title="+val;
			var id = entity.saveActivity(param);
			window.location.href = 'index.php?searchDate=' + entity.loadDate;
		});
	},
	

	toSaveParam : function(){
		var entity = this;
		var timeParam = entity.timeParam;
		var startDate = timeParam.startDate;
		var endDate = timeParam.endDate;
		var startTime = timeParam.startTime;
		var endTime = timeParam.endTime;
		var st = startDate.year+"-"+startDate.month+"-"+startDate.day+" "+startTime.hour+":"+startTime.second*30+":00";
		var et = endDate.year+"-"+endDate.month+"-"+endDate.day+" "+endTime.hour+":"+endTime.second*30+":00";
		entity.timeParam = {};
		return 'activity.startTime='+st+"&activity.endTime="+et;
	},

	toLoadParam : function(){
		var entity = this;
		var timeParam = entity.timeParam;
		var startDate = timeParam.startDate;
		var endDate = timeParam.endDate;
		
		entity.timeParam  = {};
		return 'activity.startTime='+startDate+"&activity.endTime="+endDate;
	},

	saveActivity : function(param){
		var entity = this;
		var timeParam = entity.toSaveParam();
		var data = timeParam+"&"+param;
		var id;
		$.ajax({
			url : "save_event.php",
			data:data,
			type:'post',
			async:false,
			dataType:'json',
			success:function(data){
				console.log(data);
				if(data.returnStr=="success"){
				  id = data.id;
				}
			},
			error:function(){
				console.log(data);
			}
		});
		return id;
	},

	loadWeekActivity : function(){
		var entity = this
		var data = entity.toLoadParam();
		console.log(data);
		$.ajax({
			url : "load_event.php",
			data:data,
			type:'post',
			async:false,
			dataType:'json',
			success:function(activityArray){
				entity.drawWeekActivity(activityArray);
			},
			error:function(){
			}
		});
	},
	// draw users
	
	drawUser: function(users) {
		var options = "";
		console.log(users);
		for(var i=0;i<users.length;i++){
			var user = users[i];
			console.log(user);
			options += "<option value='" + user.username + "'>" + user.username + "</option>";	
		}
		console.log(options);
		$("#share_user").html(options);
		
		console.log($("#share_user").html());
	},
	
	//loaduser
	loadUsers : function(){
		var entity = this
		$.ajax({
			url : "load_users.php",
			type:'get',
			async:false,
			dataType:'json',
			success:function(data){
				entity.drawUser(data);
			},
			error:function(){
			}
		});
	},	
	

	refreshItems : function(id){
		var entity = this;

		var returnArray = new Array();
		var i=0;
		$("#"+id+" .itemTr").each(function(){
		 var items = $(this).find("table.dayItem_all,table.dayItem_head");
		 items.each(function(){
		 	var thisItem = $(this);
			 var array = new Array();
			 if(thisItem.size()==0){
					return false;
				}
				var activity = {};
					var startTime = {};
					var endTime = {};
					array["gapMills"] = parseInt(thisItem.find(".gapMills").val());
					array["item"] = thisItem.parent().html();
					startTime.day = entity.strToTime(thisItem.find(".startDate").val()).day;
					endTime.day = entity.strToTime(thisItem.find(".endDate").val()).day;
					array["startTime"] = thisItem.find(".startDate").val();
					array["endTime"] = thisItem.find(".endDate").val();
					array["title"] = thisItem.find(".MM").text();
					thisItem.remove();
					returnArray[i]=array;
					i++;
		 });
		 });
		 return returnArray;
	},

	drawWeekActivity : function(activityArray){
		var entity = this;
		if(activityArray==null)
		return;
		for(var i=0;i<activityArray.length;i++){
			var activity = activityArray[i];
			var start = entity.strToTime(activity.startTime);
			var end = entity.strToTime(activity.endTime);

			var trId = start.trId;
			var startTr = $("#"+trId);
			var startIndex;
			if(startTr.is(".solid")){
				startIndex = start.dayOfThisWeek+1;
			}else {
				startIndex = start.dayOfThisWeek;
			}
			var startTd = startTr.find("td").eq(startIndex);
			var startTdInfo = entity.getTdInfo(startTd);

			var endTrId = end.trId;
			var endTr = $("#"+endTrId);
			var endIndex;
			if(startTr.is(".solid")){
				endIndex = end.dayOfThisWeek+1;
			}else {
				endIndex = end.dayOfThisWeek;
			}
			var endTd = endTr.find("td").eq(endIndex);
			var endTdInfo = entity.getTdInfo(endTd);

			var selectItemId = entity.selectItem();

			var top = startTdInfo.top+start.px;
			$("#"+selectItemId).css({left:startTdInfo.left+'px',top:top+'px'});
			$("#"+selectItemId).width(startTdInfo.width-7);
			$("#"+selectItemId+" .content").height(endTdInfo.top-top+end.px-5-15);
			$("#"+selectItemId+" .head").text(start.hour+":"+start.minute+"-"+end.hour+":"+end.minute + ", " + activity.user);
			$("#"+selectItemId).removeClass("temp");
			$("#"+selectItemId+" .content td").text(activity.title);

			$("#"+selectItemId+" .content").css({"background": "#" + activity.color});
			
			var hiddenField = '<input type="hidden" class="activityId" value="'+activity.id+'">';
			$(hiddenField).appendTo($("#"+selectItemId));

			$("#"+selectItemId).click(function(){
				entity.clear();
				var position = {};
				position.left = $(this).offset().left;
				position.top = $(this).offset().top+15;
				var id = $(this).find(".activityId").val();
				entity.viewActivity(position,id);
			});
		}
	},
	//view activity
	viewActivity : function(position,activityId){
		var entity = this;
		$.ajax({
			url : "view_event.php",
			data:'activity.id='+activityId,
			type:'post',
			async:false,
			dataType:'json',
			success:function(activity){
				var popItemId = entity.popItem();
				entity.setPopItemPosition(position,popItemId);
				entity.activityViewItem(popItemId,activity, position);
			},
			error:function(){
				alert("error");
			}
		});
	},
	
	// edit event
	activityEditItem: function (popItemId,activity) {
        
        var entity = this;
		var start = entity.strToTime(activity.startTime);
		var end = entity.strToTime(activity.endTime);
		var startDate = start.year+"-"+start.month+"-"+start.day;
		var endDate = end.year+"-"+end.month+"-"+end.day;
		var startTime = start.hour+":"+start.minute;
		var endTime = end.hour+":"+end.minute;
		var time;
		if(startDate==endDate){
			time = startDate+","+startTime+"-"+endTime;
		}else {
			time = startDate+","+startTime+"   "+endDate+","+endTime;
		}
		
		var item = [];
		item.push('<div>');
		item.push('<table class="contentTable"><tr><td class="label">Content：</td><td><input type="text" class="text" /></td></tr><tr><td class="time">'+time+'</td></tr><tr><td class="time">'+activity.user+'</td></tr></table>');
		item.push('<div class="line"><div>');
		item.push('<div class="viewOperate"><a href="#" class="save">Save</a></div>');
		item.push('</div>');
		$(item.join('')).appendTo($("#"+popItemId+" .MC"));

		$(".save").click(function(){

		    //var param = "idList[0]="+activity.id;
		    $.ajax({
				url : "edit_event.php",
				data: 'activity.id='+activity.id + '&activity.title='+$("#"+popItemId+" .text").val(),
				type:'post',
				dataType:'json',
				success:function(result){
                    window.location.href = 'index.php?searchDate=' + entity.loadDate;
				},
				error:function(){
					alert("error");
				}
		    });
		});
	
	},
	
	activityViewItem : function(popItemId,activity, position){
		var entity = this;
		var start = entity.strToTime(activity.startTime);
		var end = entity.strToTime(activity.endTime);
		var startDate = start.year+"-"+start.month+"-"+start.day;
		var endDate = end.year+"-"+end.month+"-"+end.day;
		var startTime = start.hour+":"+start.minute;
		var endTime = end.hour+":"+end.minute;
		var time;
		if(startDate==endDate){
			time = startDate+","+startTime+"-"+endTime;
		}else {
			time = startDate+","+startTime+"   "+endDate+","+endTime;
		}
		
		var item = [];
		item.push('<div>');
		item.push('<table class="contentTable"><tr><td class="title">'+activity.title+'</td></tr><tr><td class="time">'+time+'</td></tr><tr><td class="time">'+activity.user+'</td></tr></table>');
		item.push('<div class="line"><div>');
		item.push('<div class="viewOperate"><a href="#" class="delete">Delete</a><a href="#" class="moreInfo">Edit</a></div>');
		item.push('</div>');
		$(item.join('')).appendTo($("#"+popItemId+" .MC"));

		$(".delete").click(function(){

		    //var param = "idList[0]="+activity.id;
		    $.ajax({
				url : "delete_event.php",
				data: 'activity.id='+activity.id,
				type:'post',
				dataType:'json',
				success:function(result){
				entity.clear();
				$("input[value="+activity.id+"]").parent().remove();
				},
				error:function(){
					alert("error");
				}
		    });
		});

		$("#"+popItemId+" .moreInfo").click(function(){
			entity.clear();
			var popItemId = entity.popItem();
			entity.setPopItemPosition(position,popItemId);
			entity.activityEditItem(popItemId,activity);
		});
	},

	clear:function(){
		$(".temp").remove();
	},
	padding4: function (num, length) {
  
        return (Array(length).join("0") + num).slice(-length);
    },
	// get new date
	nowDate : function(){
		var date = new Date();
		var year = date.getFullYear();
		var month = parseInt(date.getMonth())+1;
		month = this.padding4(month, 2);
		var day = date.getDate();
		var full_day = year+"-"+month+"-"+day;
		return full_day;
	},

	random : function(){
	
		var r = Math.round(Math.random()*1000);
	
		var date = new Date();
		var year = date.getYear();
		var month = date.getMonth();
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var seconds = date.getSeconds();

		return 'id_'+year+month+day+minutes+seconds+r;
	}
}
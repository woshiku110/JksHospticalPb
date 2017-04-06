	var times = 1.1;
	var medical_xuhao = 0;

	var table_no = 0;


	
	var num = document.getElementById('num');                              	//订单编号
	var nam = document.getElementById('name');								//药品名称
	
	var guige = document.getElementById('guige');							//规格
	var count = document.getElementById('count');							//数量
	var tr_count = document.getElementById('tr_count');						//表格的行数
	var page_current = document.getElementById('page_current');				//当前页面索引
	var page_length  = document.getElementById('page_length');				//所有图片长度
	var left  = document.getElementsByClassName('ico_left')[0];				//切换上账
	var right = document.getElementsByClassName('ico_right')[0];			//切换下张
	var large = document.getElementsByClassName('ico_sclare_large')[0];		//图片放大
	var small = document.getElementsByClassName('ico_sclare_small')[0];		//图片缩小
	var roateLeft  = document.getElementsByClassName('ico_left_re')[0];		//左旋转
	var roateRight = document.getElementsByClassName('ico_right_re')[0];	//右旋转


	tr_count.innerText = 0;
	var table1 = new Table('table1',0,6);
	table1.setColWidth(["10%","20%","25%","20%","15%","10%"]); 
	table1.setHead(["&nbsp;序号","药品编号","药品名称","药品规格","药品数量","操作"]);


	

	

	

	var bring = new Button('bring', '取出订单', 'page/entry/ico/ico_download.png');
	var no = new Button('no', '无法识别', 'page/entry/ico/ico_no.png');
	var pause = new Button('pause', '暂停录入', 'page/entry/ico/ico_stop.png');


	
	bring.status = 'pauseImport';
	bring.onclick = function(){
		if(this.status == 'pauseImport'){
			this.status = 'outOfQueue';
			outOfQueue();
			bring.setText('暂停录入');
			bring.setIcon('page/entry/ico/ico_stop.png');
			console.log('药品Id：'+medical_no+' 药品名称: '+medical_name+' 药品规格: '+medical_guige+' 药品数量: '+medical_count);
		}
		else{
			this.status = 'pauseImport';
			pauseImport();
			bring.setText('取出订单');
			bring.setIcon('page/entry/ico/ico_download.png');

			img.src = '';
			count.value = 0;
			num.textContent = '';
			medical_num = '';
			medical_no = 0;
			medical_name = '';
			medical_guige = '';
			medical_count = '';
			medical_xuhao = 0;
			table1.clean();

			console.log('药品Id：'+medical_no+' 药品名称: '+medical_name+' 药品规格: '+medical_guige+' 药品数量: '+medical_count);
		}
	}



	

	


	var medical_num;
	var medical_no;
	var medical_name;
	var medical_guige;
	var medical_count;
	var medical_opration;

	nam.onkeyup = function(){
		$.post(_serverHome+"yuyue/MedicinalSupport_listSome",
		{
		    mcorbh:this.value,
		},
	    function(data,status){
	    	console.log(data);
	    });
	}




	//下拉选中后
	document.getElementById('defined').onclick = function(){
		var msgJSON;
		var msg_length;
		var arr = [];
		$.post(_serverHome+"yuyue/MedicinalSupport_medicinalSize",
		{
		    mc:'阿莫西林',
		},
	    function(data,status){
	    	console.log(data.msg);
	    	msgJSON = JSON.parse(data.msg);
	    	msg_length = msgJSON.length;
	    	for(var i=0; i<msg_length; i++){
	    		msgJSON[i].index = i;
	    		var option = document.createElement('option');
	    		option.innerText = msgJSON[i][3];
	    		guige.appendChild(option);
	    	}

	    	
	    	//默认的药品编号/药品名称/药品规格
	    	medical_no = msgJSON[0][0];
	    	medical_weizhi = msgJSON[0][1];
	    	medical_name = msgJSON[0][2];
	    	medical_guige = msgJSON[0][3];

	    	arr = msgJSON[0];

	    	console.log(arr);
	    });


		guige.oninput = function(){
			var msgJSON_index = guige.options[guige.selectedIndex].index;
			arr = msgJSON[msgJSON_index];

			medical_no = arr[0];
			medical_weizhi = arr[1];
			medical_name = arr[2];
			medical_guige = arr[3];

			console.log(arr);
		};
	};


	//只让用户写数字
	count.onkeyup = function(){this.value=this.value.replace(/[^0-9-]+/,'');}
	count.onblur = function(){count.onkeyup();}


	var template = ["[0]","[1]","[2]","[3]","[4]","[5]"];
	table1.setTemplate(template);

	function del(){
		return "<button class='del' onclick='do_delete(this)'>删除</button>";
	}

	function do_delete(obj){
		if(confirm('你确定要删除么?')){
			table1_t.removeChild(obj.parentNode.parentNode);
			tr_count.innerText = --num2;
		}
	}


	num2 = 0;
	function add(){
		medical_xuhao++;
		var data = [medical_xuhao,''+medical_weizhi,''+medical_name,''+medical_guige,''+medical_count,del()];
		table1.add(data,true);
		tr_count.innerText = ++num2;
	}



	function entry(){
		medical_count = count.value;
		if(medical_count == ''){
			alert('请输入药品数量');
		}else{
			console.log('药品Id：'+medical_no+' 药品名称: '+medical_name+' 药品规格: '+medical_guige+' 药品数量: '+medical_count);
			add();
		}
		
	}
	


	function submit(){
		if(photo_arr.length == photo_length){
			alert('可以提交');
		}else{
			alert('你还没有看完，不可以提交');
		}
	}




	var couponNo = '';
	var DEFAULT_TXT = '请输入验证码';
	
	var startTime,psX,psY;

	$('#keyboard li').on('touchstart',function(e){
		startTime=new Date();
	});

	$('#keyboard li').on('touchmove',function(){
		
	});

	$('#keyboard li').on('touchstart',function(){
		var _this=$(this);
		clickKeyboard($(this).data("key"));
	});		

	function resetPage() {
		//输入框重置
		//$("#couponNo").val(DEFAULT_TXT);
		//document.getElementById('couponNo').style.color = '#C5C5C5';
		//验证按钮灰掉
		$("#couponNo").html("");
		$("#couponInput .moneytip").removeClass("hidec");
		$("#keyboard ul li:last-child").addClass("no-number").removeClass("has-number");
	}
	$("#couponInput > span").longTap(function(){
		resetPage();
		return;
	});

	function clickKeyboard(value) {

		var obj = document.getElementById('couponNo');
		var text = $(obj).html();

		if (text == DEFAULT_TXT && value != 'cancel' && value != 'ok') {
			text = '';
			obj.style.color = '#202020';
		}

		if (value == 'cancel') {
			resetPage();
			return;
		} else if (value == 'ok') {
			if (text == '' || text == null || text == '请输入验证码') {
				return;
			} else {
			    //测试线注掉
				//MerchantKeeper.verifyCode(text.replace(/\s/g, ''), '0');
			    
			    MerchantKeeper.fastCheck(text.replace(/\s/g, ''), '0');
			}
		} else {
			if (text.length == 4 || text.length == 9 || text.length == 14) {
				text = text + ' ';
			} else if (text.length == 18) {
				return;
			}
			$("#couponInput .moneytip").addClass("hidec");
			text = text + value;
			//alert(text);
		}
		$('#couponNo').html(text);
		if(text.length > 0){
			//$("#keyboard ul li.normal").addClass("has-number").removeClass("no-number");

			$("#keyboard ul li:last-child").addClass("has-number").removeClass("no-number");
		}
	}

	$("#couponInput > span").tap(function() {
		var txtObj = document.getElementById('couponNo');
		var con = $('#couponNo').html();
		if (con == DEFAULT_TXT || con == '' || con.length == 1) {
			$('#couponNo').html(con.slice(0, -1));
			resetPage();
			return;
		}else{
			$('#couponNo').html(con.slice(0, -1));
			var txtval=$('#couponNo').html().length;
			if((txtval-1)%4==0 && txtval!=1){
				$('#couponNo').html($('#couponNo').html().slice(0, -1));
			}
		}
	});

	$("#failedBack").tap(function() {
		$(".div_content").hide();
		$(".div_overlay").hide();
		resetPage();
	});

	var timeout;

	$("#barCode").tap(function() {

		$(this).parent("li").addClass("active").siblings().removeClass("active");
		var _this=$(this);
		setTimeout(function(){
			_this.parent("li").removeClass("active").siblings().addClass("active");
		},200)
		location.href = "cmbsteward://go?url=barcode";
	});

	$(".query-nav").tap(function() {
		location.href = "cmbsteward://go?url=tab&index=2&relurl="+encodeURIComponent("views/queryCoupon.html?entrance=detail");
	});

<?php
	session_start();
	if($_SERVER['HTTP_HOST'] == 'localhost') {
		include('D:web/htdocs/go/framework/init.inc.php');
	} else {
		include('/home/www/framework/init.inc.php');
	}
class common extends MinisiteController{
	
	public function __construct() {
		
		parent::__construct();
	}

	public function subMessage() {
		
		$form = new MinisiteForm();
		$model = new MinisiteModel('go2016', '1110_wangstiger_info');
		/*$_POST['name'] = '测试';
		$_POST['phone'] = '15521125230';		
		$_POST['province'] = '上海';
		$_POST['city'] = '奉贤';
		$_POST['dealer'] = '上海奉贤东昌凯帝汽车销售服务有限公司';	
		$_POST['source'] = 'wap';
		$_POST['buycartime'] = '一年内';*/
		$guize = array(
			array('name', 'require', '请输入姓名'),
			//array('sex', 'require', '请选择性别'),
			array('phone', 'require', '请输入手机'),
			array('phone', 'phone', '手机格式不正确'),
			array('phone', 'unique', '该手机已存在', '0', $model),
			array('province', 'require', '请选择省份'),
			array('city', 'require', '请选择城市'),
			array('dealer', 'require', '请选择经销商'),	
			array('buycartime', 'require', '请选择试预计购车时间'),
		);

		$data = $_POST;
		$source = $_POST['source'];		
		$ret = $form->validateForm($guize, $data);
		switch ($source)
		{
		case 'wap':
			$url = 'http://s.auto.163.com/2016/1110/wangsTiger/';
		    break;		
		default:
			$url = '';
		}
		//汽车频道接口所需参数------【活动有以下参数才传值，没有不需要传   *********电话+数据创建时间**********为必填项】
		$param_arr['name']	= $_POST['name'];//姓名
		$param_arr['tel']= $_POST['phone'];//电话*（必填）
		$param_arr['brand']= '福特';//用户欲购买的意向车品牌
		$param_arr['chexi']	= '新福特翼虎';//用户欲购买的意向车系
		$param_arr['chekuan'] = '';//用户欲购买的意向车型
		$param_arr['sex']	= '';//性别（1男，0女）
		$param_arr['ip']	= MinisiteFunction::GetIP();//IP
		$param_arr['province']	= $_POST['province'];//省份
		$param_arr['city']= $_POST['city'];//城市
		$param_arr['area']= '';//地区
		$param_arr['proj']	= '新福特翼虎出色之旅';//项目名称
		$param_arr['target_dealer'] =$_POST['dealer'];//经销商
		$param_arr['gouche']	= '';//是否购车
		$param_arr['create_time']= date('Y-m-d');//数据创建时间*（必填）
		$param_arr['expect_buy_time']= $_POST['buycartime'];//用户期望购车时间
		$param_arr['distribution_status']	= '';//数据是否分发
		$param_arr['customer_service'] ='';//客服处理状态
		$param_arr['status']	= '';//
		$param_arr['alter_time']= '';//数据最后修改时间
		$param_arr['source']= $source;//来源
		$param_arr['alter_account']= '';//数据修改账户
		$param_arr['post_time']	=date('Y-m-d');//数据提交时间
		$param_arr['link']	=$url;//专题链接
		//汽车频道接口地址
		$api_url='http://usercenter.ws.netease.com/data/receive/push.json';

		if($ret) {
			$data['createdate'] = date('Y-m-d');
			$data['ip'] = MinisiteFunction::GetIP();	
			$id = $model->add($data);			
			$car_result = $this->sendCarInfo($api_url,$param_arr);	
			$this->ajaxReturn($car_result->statusCode, '信息收集成功', 1);
		} else {
			$errorInfo = $form->getFormInfo();
			$this->ajaxReturn($errorInfo, '收集失败', -1);
		}
	}
}

App::run();
?>
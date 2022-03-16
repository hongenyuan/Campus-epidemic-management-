<script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=YOURKEY"></script>
<template lang="">
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="今日温度" prop="tempreture">
                <el-input v-model="ruleForm.tempreture"></el-input>
            </el-form-item>
            <el-form-item label="当前位置" prop="location">
                <el-input v-model="ruleForm.location" :disabled="true" placeholder="获取地理位置"></el-input>
                <el-button type="primary" @click="getLocation">获取当前位置</el-button>
            </el-form-item>
            <el-form-item label="健康码" prop="healthCode">
                <el-radio-group v-model="ruleForm.healthCode">
                    <el-radio label="绿色"></el-radio>
                    <el-radio label="橙色"></el-radio>
                    <el-radio label="红色"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否发热咳嗽" prop="isHot">
                <el-radio-group v-model="ruleForm.isHot">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否去过高风险地区" prop="isRisk">
                <el-radio-group v-model="ruleForm.isRisk">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="当前是否在校" prop="isSchool">
                <el-radio-group v-model="ruleForm.isSchool">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="填报是否属实" prop="isTruth">
                <el-radio-group v-model="ruleForm.isTruth">
                    <el-radio label="是"></el-radio>
                    <el-radio label="否"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<style>
    .el-form-item__content {
        margin-left: 20px !important;
        text-align: left !important;
    }

    .el-form-item__label {
        width: 20% !important;
        text-align: left !important;
    }
</style>
<script>
    export default {
        data() {
            return {
                ruleForm: {
                    h_id: Date.now(),
                    u_id: localStorage.getItem('u_id'),
                    tempreture: '',
                    isHot: '',
                    isRisk: '',
                    location: '',
                    healthCode: '',
                    isSchool: '',
                    isTruth: '',
                },
                rules: {
                    tempreture: [{
                        required: true,
                        message: '请输入温度',
                        trigger: 'blur'
                    }],
                    location: [{
                        required: true,
                        message: '请输入地址',
                        trigger: 'blur'
                    }],
                    healthCode: [{
                        required: true,
                        message: '请选择健康码状态！',
                        trigger: 'change'
                    }],
                    isHot: [{
                        required: true,
                        message: '请选择！',
                        trigger: 'change'
                    }],
                    isRisk: [{
                        required: true,
                        message: '请选择！',
                        trigger: 'change'
                    }],
                    isSchool: [{
                        required: true,
                        message: '请选择！',
                        trigger: 'change'
                    }],
                    isTruth: [{
                        required: true,
                        message: '请选择！',
                        trigger: 'change'
                    }],
                }
            }
        },
        methods: {
            getLocation() {
                const that = this
                var mapObj, geolocation;
                mapObj = new AMap.Map('iCenter');
                mapObj.plugin('AMap.Geolocation', function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, //是否使用高精度定位，默认:true
                        timeout: 10000, //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0, //定位结果缓存0毫秒，默认：0
                        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true, //显示定位按钮，默认：true
                        buttonPosition: 'LB', //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
                    AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
                });

                function onComplete(result) {
                    console.log('获取定位成功！');
                    that.ruleForm.location = result.formattedAddress;
                }

                function onError(error) {
                    console.log(error)
                }
            },
            setHealth() {
                this.axios({
                    method: 'POST',
                    url: 'http://localhost:8001/setHealth',
                    data: {
                        form: this.ruleForm
                    }
                }).then(result => {
                    const date = new Date() //设置是否已填报的标识
                    localStorage.setItem('updateHealthtime', JSON.stringify(date.getDate()))
                })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('请如实填报数据，若有瞒报一经发现按校规处理！',
                            '提示', { //$confirm 在Vue的原型对象上，由element-ui引进来的
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                            this.setHealth()
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消提交'
                            })
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
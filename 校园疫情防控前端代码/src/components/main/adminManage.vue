<template>
    <div style="height: 550px; line-height: 0px;">
        <div class="row" style="margin: 50px 0 60px 0; display: flex;">
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-info">
                    <div class="inner">
                        <p>今日未填报人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                        <h3 v-text="notFill"></h3>
                    </div>
                    <a href="#" class="small-box-footer">详情 <span class="glyphicon glyphicon-share-alt"></span></a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-success">
                    <div class="inner">
                        <p>今日离校人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-stats-bars"></i>
                        <h3 v-text="notSchool"></h3>
                    </div>
                    <a href="#" class="small-box-footer">详情 <span class="glyphicon glyphicon-share-alt"></span></a>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <p>今日发热人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                        <h3 v-text="hotPeople"></h3>
                    </div>
                    <a href="#" class="small-box-footer"> 详情 <span class="glyphicon glyphicon-share-alt"></span> </a>
                </div>
            </div>
            <!-- ./col -->
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-warning">
                    <div class="inner">
                        <p>14天内经过高风险区人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                        <h3 v-text="riskAreapeople"></h3>
                    </div>
                    <a href="#" class="small-box-footer" @click="toriskAreapeople">详情 <span
                            class="glyphicon glyphicon-share-alt"></span></a>
                </div>
            </div>
            <div class="col-lg-3 col-6">
                <!-- small box -->
                <div class="small-box bg-danger">
                    <div class="inner">
                        <p>健康码异常人数</p>
                    </div>
                    <div class="icon">
                        <i class="ion ion-person-add"></i>
                        <h3 v-text="notGreen"></h3>
                    </div>
                    <a href="#" class="small-box-footer">详情 <span class="glyphicon glyphicon-share-alt"></span></a>
                </div>
            </div>
        </div>
        <div class="row" style="line-height: 10px;">
            <div class="col-lg-6" style="width: 50%;">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span style="color: rgb(115, 119, 119); font-weight: 600; font-size: 17px;">今日汇报情况</span>
                    </div>
                    <ve-line :data="chartData3" height="30rem"></ve-line>
                </el-card>
            </div>
            <div class="col-lg-6" style="width: 50%">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span style="color: rgb(115, 119, 119); font-weight: 600;font-size: 17px;">本月汇报情况</span>
                    </div>
                    <ve-line :data="chartData" height="30rem"></ve-line>
                </el-card>
            </div>
        </div>
        <br />

    </div>

</template>
<style scoped>
    .small-box {
        height: 180px;
    }

    .small-box p {
        font-size: 15px;
        font-weight: 550;
        color: rgb(233, 224, 225);
    }

    .small-box a {
        font-size: 13px;
        color: rgb(212, 222, 231);
        font-weight: 600;
    }

    .small-box h3 {
        display: inline-block;
        margin-left: 10px;
        font-weight: 700;
        font-size: 30px;
        color: rgb(54, 48, 48);
    }

    .col-lg-3 .col-6 {
        display: inline-block;
    }

    .row {
        line-height: 40px;
    }

    .bg-danger {
        background-color: rgba(220, 53, 68);
    }

    .bg-warning {
        background-color: rgba(255, 194, 9);
    }

    .bg-success {
        background-color: rgba(39, 167, 69);
    }

    .bg-info {
        background-color: rgba(23, 163, 184);
    }

    .icon {
        font-size: 60px;
        color: rgba(77, 70, 70, 0.5);
        text-align: left;
    }
</style>
<script>
    import iskAreapeople from './iskAreapeople.vue'
    export default {
        data() {
            return {
                notFill: '',
                notSchool: '',
                hotPeople: '',
                riskAreapeople: '',
                notGreen: '',
                chartData: {
                    columns: ['小时', '填报人数'],
                    rows: []
                },
                chartData3: {
                    columns: ['小时', '填报人数'],
                    rows: []
                }
            }
        },
        components: {
            iskAreapeople
        },
        methods: {
            toriskAreapeople() {
                this.$router.push({
                    path: '/admin/iskAreapeople',
                })
            }
        },
        created() {
            /**
             * 获取当天健康表信息
             */
            this.axios({
                url: "http://localhost:8001/admin/getHealthnowDay",
                method: "POST",
            }).then(response => {
                let result = response.data
                let tim0 = 0;
                let tim1 = 0;
                let tim2 = 0;
                let tim3 = 0;
                let tim4 = 0;
                let tim5 = 0;
                let tim6 = 0;
                let tim7 = 0;
                let tim8 = 0;
                let tim9 = 0;
                let tim10 = 0;
                let tim11 = 0;
                let tim12 = 0;
                let tim13 = 0;
                let tim14 = 0;
                let tim15 = 0;
                let tim16 = 0;
                let tim17 = 0;
                let tim18 = 0;
                let tim19 = 0;
                let tim20 = 0;
                let tim21 = 0;
                let tim22 = 0;
                let tim23 = 0;
                let time0 = 0;
                let time1 = 0;
                let time2 = 0;
                let time3 = 0;
                let time4 = 0;
                let time5 = 0;
                let time6 = 0;
                let time7 = 0;
                let time8 = 0;
                let time9 = 0;
                let time10 = 0;
                let time11 = 0;
                let time12 = 0;
                let time13 = 0;
                let time14 = 0;
                let time15 = 0;
                let time16 = 0;
                let time17 = 0;
                let time18 = 0;
                let time19 = 0;
                let time20 = 0;
                let time21 = 0;
                let time22 = 0;
                let time23 = 0;
                let time24 = 0;
                let time25 = 0;
                let time26 = 0;
                let time27 = 0;
                let time28 = 0;
                let time29 = 0;
                let time30 = 0;
                let time31 = 0;
                let notGreen = 0;
                let notSchool = 0;
                let hesuanNo = 0;
                let hotPeople = 0;
                let riskAreapeople = 0;
                console.log(result);
                result.forEach((value) => {
                    if (value.tempreture >= 37.5) hotPeople++
                    if (value.isRisk === "是") riskAreapeople++
                    if (value.healthCode != "绿色") notGreen++
                    if (value.isSchool === "否") notSchool++
                    let date = value.createtime;
                    let newdate = new Date(date);
                    let newdate1 = newdate.getDate();
                    let newdate2 = newdate.getHours();
                    if (newdate2 == 0) {
                        tim0++
                    }
                    if (newdate2 == 1) {
                        tim1++
                    }
                    if (newdate2 == 2) {
                        tim2++
                    }
                    if (newdate2 == 3) {
                        tim3++
                    }
                    if (newdate2 == 4) {
                        tim4++
                    }
                    if (newdate2 == 5) {
                        tim5++
                    }
                    if (newdate2 == 6) {
                        tim6++
                    }
                    if (newdate2 == 7) {
                        tim7++
                    }
                    if (newdate2 == 8) {
                        tim8++
                    }
                    if (newdate2 == 9) {
                        tim9++
                    }
                    if (newdate2 == 10) {
                        tim10++
                    }
                    if (newdate2 == 11) {
                        tim11++
                    }
                    if (newdate2 == 12) {
                        tim12++
                    }
                    if (newdate2 == 13) {
                        tim13++
                    }
                    if (newdate2 == 14) {
                        tim14++
                    }
                    if (newdate2 == 15) {
                        tim15++
                    }
                    if (newdate2 == 16) {
                        tim16++
                    }
                    if (newdate2 == 17) {
                        tim17++
                    }
                    if (newdate2 == 18) {
                        tim18++
                    }
                    if (newdate2 == 19) {
                        tim19++
                    }
                    if (newdate2 == 20) {
                        tim20++
                    }
                    if (newdate2 == 21) {
                        tim21++
                    }
                    if (newdate2 == 22) {
                        tim22++
                    }
                    if (newdate2 == 23) {
                        tim23++
                    }
                })
                this.notFill = 100 - result.length;
                this.notGreen = notGreen
                this.notSchool = notSchool
                this.hotPeople = hotPeople
                this.riskAreapeople = riskAreapeople
                this.chartData3.rows.push({
                    '小时': '00',
                    '填报人数': tim0
                }, {
                    '小时': '01',
                    '填报人数': tim1
                }, {
                    '小时': '02',
                    '填报人数': tim2
                }, {
                    '小时': '03',
                    '填报人数': tim3
                }, {
                    '小时': '04',
                    '填报人数': tim4
                }, {
                    '小时': '05',
                    '填报人数': tim5
                }, {
                    '小时': '06',
                    '填报人数': tim6
                }, {
                    '小时': '07',
                    '填报人数': tim7
                }, {
                    '小时': '08',
                    '填报人数': tim8
                }, {
                    '小时': '09',
                    '填报人数': tim9
                }, {
                    '小时': '10',
                    '填报人数': tim10
                }, {
                    '小时': '11',
                    '填报人数': tim11
                }, {
                    '小时': '12',
                    '填报人数': tim12
                }, {
                    '小时': '13',
                    '填报人数': tim13
                }, {
                    '小时': '14',
                    '填报人数': tim14
                }, {
                    '小时': '15',
                    '填报人数': tim15
                }, {
                    '小时': '16',
                    '填报人数': tim16
                }, {
                    '小时': '17',
                    '填报人数': tim17
                }, {
                    '小时': '18',
                    '填报人数': tim18
                }, {
                    '小时': '19',
                    '填报人数': tim19
                }, {
                    '小时': '20',
                    '填报人数': tim20
                }, {
                    '小时': '21',
                    '填报人数': tim21
                }, {
                    '小时': '22',
                    '填报人数': tim22
                }, {
                    '小时': '23',
                    '填报人数': tim23
                });
            }, err => {
                console.log(err);
            })
            /**
             * 获取当月所有报表
             */
            this.axios({
                url: "http://localhost:8001/admin/gethealthNowMonth",
                method: "POST"
            }).then(response => {
                let time0 = 0;
                let time1 = 0;
                let time2 = 0;
                let time3 = 0;
                let time4 = 0;
                let time5 = 0;
                let time6 = 0;
                let time7 = 0;
                let time8 = 0;
                let time9 = 0;
                let time10 = 0;
                let time11 = 0;
                let time12 = 0;
                let time13 = 0;
                let time14 = 0;
                let time15 = 0;
                let time16 = 0;
                let time17 = 0;
                let time18 = 0;
                let time19 = 0;
                let time20 = 0;
                let time21 = 0;
                let time22 = 0;
                let time23 = 0;
                let time24 = 0;
                let time25 = 0;
                let time26 = 0;
                let time27 = 0;
                let time28 = 0;
                let time29 = 0;
                let time30 = 0;
                let time31 = 0;
                const result = response.data
                result.forEach((value, index) => {
                    let date = value.createtime;
                    let newdate = new Date(date);
                    let newdate1 = newdate.getDate();
                    if (newdate1 == 1) {
                        time1++
                    }
                    if (newdate1 == 2) {
                        time2++
                    }
                    if (newdate1 == 3) {
                        time3++
                    }
                    if (newdate1 == 4) {
                        time4++
                    }
                    if (newdate1 == 5) {
                        time5++
                    }
                    if (newdate1 == 6) {
                        time6++
                    }
                    if (newdate1 == 7) {
                        time7++
                    }
                    if (newdate1 == 8) {
                        time8++
                    }
                    if (newdate1 == 9) {
                        time9++
                    }
                    if (newdate1 == 10) {
                        time10++
                    }
                    if (newdate1 == 11) {
                        time11++
                    }
                    if (newdate1 == 12) {
                        time12++
                    }
                    if (newdate1 == 13) {
                        time13++
                    }
                    if (newdate1 == 14) {
                        time14++
                    }
                    if (newdate1 == 15) {
                        time15++
                    }
                    if (newdate1 == 16) {
                        time16++
                    }
                    if (newdate1 == 17) {
                        time17++
                    }
                    if (newdate1 == 18) {
                        time18++
                    }
                    if (newdate1 == 19) {
                        time19++
                    }
                    if (newdate1 == 20) {
                        time20++
                    }
                    if (newdate1 == 21) {
                        time21++
                    }
                    if (newdate1 == 22) {
                        time22++
                    }
                    if (newdate1 == 23) {
                        time23++
                    }
                    if (newdate1 == 24) {
                        time24++
                    }
                    if (newdate1 == 25) {
                        time25++
                    }
                    if (newdate1 == 26) {
                        time26++
                    }
                    if (newdate1 == 27) {
                        time27++
                    }
                    if (newdate1 == 28) {
                        time28++
                    }
                    if (newdate1 == 29) {
                        time29++
                    }
                    if (newdate1 == 30) {
                        time30++
                    }
                    if (newdate1 == 31) {
                        time31++
                    }
                })
                this.chartData.rows.push({
                    '小时': '00',
                    '填报人数': time0
                }, {
                    '小时': '01',
                    '填报人数': time1
                }, {
                    '小时': '02',
                    '填报人数': time2
                }, {
                    '小时': '03',
                    '填报人数': time3
                }, {
                    '小时': '04',
                    '填报人数': time4
                }, {
                    '小时': '05',
                    '填报人数': time5
                }, {
                    '小时': '06',
                    '填报人数': time6
                }, {
                    '小时': '07',
                    '填报人数': time7
                }, {
                    '小时': '08',
                    '填报人数': time8
                }, {
                    '小时': '09',
                    '填报人数': time9
                }, {
                    '小时': '10',
                    '填报人数': time10
                }, {
                    '小时': '11',
                    '填报人数': time11
                }, {
                    '小时': '12',
                    '填报人数': time12
                }, {
                    '小时': '13',
                    '填报人数': time13
                }, {
                    '小时': '14',
                    '填报人数': time14
                }, {
                    '小时': '15',
                    '填报人数': time15
                }, {
                    '小时': '16',
                    '填报人数': time16
                }, {
                    '小时': '17',
                    '填报人数': time17
                }, {
                    '小时': '18',
                    '填报人数': time18
                }, {
                    '小时': '19',
                    '填报人数': time19
                }, {
                    '小时': '20',
                    '填报人数': time20
                }, {
                    '小时': '21',
                    '填报人数': time21
                }, {
                    '小时': '22',
                    '填报人数': time22
                }, {
                    '小时': '23',
                    '填报人数': time23
                }, {
                    '小时': '24',
                    '填报人数': time24
                }, {
                    '小时': '25',
                    '填报人数': time25
                }, {
                    '小时': '26',
                    '填报人数': time26
                }, {
                    '小时': '27',
                    '填报人数': time27
                }, {
                    '小时': '28',
                    '填报人数': time28
                }, {
                    '小时': '29',
                    '填报人数': time29
                }, {
                    '小时': '30',
                    '填报人数': time30
                }, {
                    '小时': '31',
                    '填报人数': time31
                });
            }, err => {
                console.log(err);
            })
        },
    }
</script>
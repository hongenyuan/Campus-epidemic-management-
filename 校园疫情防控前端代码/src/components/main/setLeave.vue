<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <el-select v-model="value" placeholder="请选择请假类型">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <div style="height:20px"></div>
                    <div class="block">
                        <el-date-picker v-model="value2" type="datetimerange" start-placeholder="离校日期"
                            end-placeholder="返校日期">
                        </el-date-picker>
                    </div>
                    <div style="height:20px"></div>
                    <el-input type="textarea" placeholder="具体事由" v-model="textarea" maxlength="100" show-word-limit>
                    </el-input>
                    <div style="height:20px"></div>
                    <div style="float: right">
                        <el-button type="primary" @click="setApplication">提交</el-button>
                        <div style="height:20px"></div>
                    </div>

                </el-card>
                <el-divider><i class="el-icon-loading"></i></el-divider>
                <el-card style="margin-top:20px ;margin-bottom: 5rem">
                    <el-table :data="tableData" border :default-sort="{prop: 'createTime'}" style="width: 100%">
                        <el-table-column label="申请时间" sortable>
                            <template slot-scope="scope">{{ scope.row.createTime}}</template>
                        </el-table-column>
                        <el-table-column prop="leaveType" label="类型">
                        </el-table-column>
                        <el-table-column prop="reason" label="具体事由">
                        </el-table-column>
                        <el-table-column label="审核结果">
                            <template slot-scope="scope">{{ scope.row.state | state}}</template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="text-align:center;margin-top:20px">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-sizes="[5, 10, 15, 20,25]" :page-size="5"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    .el-row {
        line-height: 0px;
        height: 500px !important;

    }

    .is-always-shadow {
        margin-bottom: 0px !important;
    }
</style>
<script>
    export default {
        data() {
            return {
                total: 0,
                currentPage: 0,
                tableData: [],
                pageSize: 5,
                pageNo: 1,
                currentPage1: 1,
                text: '',
                textarea: '',
                options: [{
                    value: '病假',
                    label: '病假'
                }, {
                    value: '事假',
                    label: '事假'
                }],
                value: '',
                value2: '',
            }
        },
        created() {
            this.getapplication(this.pageNo, this.pageSize)
        },
        filters: {
            state(type) {
                if (type == 0) {
                    return "未审批"
                }
                if (type == 1) {
                    return "审批不通过"
                }
                if (type == 2) {
                    return "审批通过"
                }
            }
        },
        methods: {
            /**获取我的请假单
             *
             currPage:no-1,
             pageNum:size
             this.tableData=result.data;
             this.UserSize = result.total
             * */
            getapplication(pageNo, pageSize) {
                this.axios({
                    method: 'GET',
                    url: 'http://localhost:8001/student/getLeave',
                    params: {
                        currPage: pageNo - 1, //要获得当前页数据就要减一
                        pageNum: pageSize
                    }
                }).then(result => {
                    this.tableData = result.data.data;
                    this.total = result.data.total
                }, err => {
                    this.open(err, 'error')
                })
            },
            /**
             * 请假
             *
             reason:this.textarea,
             leavetype:this.value,
             starttime:starttime,
             endtime:endtime
             this.value2[0]请假起始时间
             this.value2[1]请假结束时间
             */
            setApplication() {
                if (!this.textarea || !this.value || !this.value2) this.open("请假信息不可以留空！", 'warning')
                else {
                    //处理从日历上获得的时间格式
                    let starttime = ''
                    let endtime = ''
                    starttime = this.moment(this.value2[0]).format("YYYY-MM-DD HH:mm:ss");
                    endtime = this.moment(this.value2[1]).format("YYYY-MM-DD HH:mm:ss")
                    this.axios({
                        url: "http://localhost:8001/student/setLeave",
                        method: "POST",
                        data: {
                            reason: this.textarea,
                            leaveType: this.value,
                            u_id: localStorage.getItem('u_id'),
                            classes: localStorage.getItem('classes'),
                            startTime: starttime,
                            endTime: endtime,
                        }
                    }).then(result => {
                        this.getapplication(this.pageNo, this.pageSize)
                        this.open(result.data, 'success')
                        this.textarea = ""
                        this.value = ""
                        this.value2 = ""
                    }, err => {
                        this.open(err, 'error')
                    })
                }

            },
            open(v, type) {
                this.$message({
                    message: v,
                    type
                });
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getapplication(this.pageNo, this.pageSize)
            },
            handleCurrentChange(val) {
                // console.log(`当前页${val} `);
                this.pageNo = val;
                this.getapplication(this.pageNo, this.pageSize)
            },
        },

    }
</script>
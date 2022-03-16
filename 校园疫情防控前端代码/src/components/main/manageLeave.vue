<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card>
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="createTime" label="申请时间" min-width="120">
                        </el-table-column>
                        <el-table-column prop="username" label="申请人" min-width="55">
                        </el-table-column>
                        <el-table-column prop="class" label="班级">
                        </el-table-column>
                        <el-table-column prop="leaveType" label="类型">
                        </el-table-column>
                        <el-table-column prop="reason" label="详细信息">
                        </el-table-column>
                        <el-table-column prop="startTime" label="离校日期">
                        </el-table-column>
                        <el-table-column prop="endTime" label="返校日期">
                        </el-table-column>
                        <el-table-column prop="state" label="审核结果">
                            <template slot-scope="scope">{{ scope.row.state | state1}}</template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button style="padding: 3px 0" type="text" @click="view(scope.$index, scope.row,1)">
                                    同意</el-button>
                                <el-button style="padding: 3px 0" type="text" @click="view(scope.$index, scope.row,2)">
                                    拒绝</el-button>
                            </template>
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
                currentPage: 12,
                tableData: [],
                pageSize: 5,
                pageNo: 1,
                currentPage1: 10,
            }
        },
        created() {
            this.getapplication(this.pageNo, this.pageSize)
        },
        filters: {
            state1(int) {
                if (int == 0) {
                    return "未审批"
                }
                if (int == 1) {
                    return "审批通过"
                }
                if (int == 2) {
                    return "审批未通过"
                }
            },
        },
        methods: {
            /**
             * 修改审批状态为同意
             l_id:row.l_id,
             upState:2
             */
            view(index, row, state) {
                this.axios({
                    method: 'POST',
                    url: 'http://localhost:8001/teacher/updateState',
                    data: {
                        l_id: row.l_id,
                        state,
                    }
                }).then(result => {
                    this.$message.success(result.data)
                    this.getapplication(this.pageNo, this.pageSize)
                }, err => {
                    this.$message.error(err.response)
                })
            },
            /**
             获取请假单
            
             currPage:no,
             pageNum:size
             this.pageNo=1
             this.tableData=result.data;
             this.UserSize = result.total
             */
            getapplication(pageNo, pageSize) {
                this.axios({
                    method: 'GET',
                    url: 'http://localhost:8001/teacher/getLeave',
                    params: {
                        currPage: pageNo - 1, //要获得当前页数据就要减一
                        pageNum: pageSize
                    }
                }).then(result => {
                    this.pageNo = 1
                    this.tableData = result.data.data;
                    this.total = result.data.total
                }, err => {
                    this.open(err, 'error')
                })
            },


            //分页
            handleSizeChange(val) {
                this.pageSize = val
                this.getapplication(this.pageNo, this.pageSize)
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.getapplication(this.pageNo, this.pageSize)
            }
        },
    }
</script>
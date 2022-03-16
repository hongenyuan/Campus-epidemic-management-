<template>
    <div style="line-height: 0px;">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :header-cell-style="a"
            :cell-style="b" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="发布日期" width="160">
                <template slot-scope="scope">{{ scope.row.createtime }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="200">
            </el-table-column>
            <el-table-column prop="author" label="发布人" show-overflow-tooltip>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button class="btn" size="mini" type="danger"
                        @click="handleDelete(scope.$index, scope.row,scope)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button @click="handleDeletesome" type="primary" icon="el-icon-delete" ref="delete" style="display: none;">
        </el-button>
    </div>
</template>
<style scoped>
    .btn {
        display: none;
    }

    tr:hover .btn {
        display: block;
    }
</style>
<script>
    export default {
        name: 'getNotice',
        data() {
            return {
                tableData: JSON.parse(window.localStorage.getItem('tableData')) || [],
                multipleSelection: [],
                middleNotice: JSON.parse(window.localStorage.getItem('middleNotice')) || [],
                Socket: ''
            }
        },
        activated() {
            //组件激活时
            const that = this
            that.Socket = new WebSocket("ws://localhost:3000/");
            that.Socket.onopen = function () {
                console.log('wss服务器连接成功！');
                that.Socket.send(11); //必须发送参数后端才响应数据
            }
            that.Socket.onclose = function () {
                console.log('websocket close');
            }
            that.Socket.onmessage = function (e) { //收到响应的数据就调用这个回调
                //接收服务端传来的json数据并转为数组，将数组保存在middleNotice
                that.toArray(JSON.parse(e.data))
            }
        },
        deactivated() {
            this.Socket.onclose = function () {
                console.log('websocket close');
            }
        },
        methods: {
            //把对象数据转为数组
            toArray(obj) {
                //直接对数组赋值不能被vue监测到，只能用push方法保存数据
                if (this.middleNotice.length == 0) {
                    for (var k in obj) {
                        this.middleNotice.push(obj[k]);
                    }
                } else {
                    this.middleNotice.splice(0, this.middleNotice.length)
                    for (var i in obj) {
                        this.middleNotice.push(obj[i]);
                    }
                }
            },
            //删除单条通知
            handleDelete(index, row) {
                // console.log(this.multipleSelection);
                console.log(index, row);
                this.tableData = this.tableData.filter(item => {
                    return item.createtime != row.createtime
                })
            },
            //批量删除
            handleDeletesome() {
                this.multipleSelection.filter((Item) => {
                    this.tableData = this.tableData.filter((item) => {
                        return item.createtime != Item.createtime
                    })
                })
            },
            //选择框改变时
            handleSelectionChange(val) {
                this.multipleSelection = val;
                if (val.length != 0) {
                    console.log(this.multipleSelection);
                    this.$refs.delete.$el.style.display = 'block'
                } else {
                    this.$refs.delete.$el.style.display = 'none'
                }
            },

            //设置表格样式
            a(column) {
                if (column.columnIndex === 2) {
                    return "padding-left:60px"
                } else if (column.columnIndex == 3) {
                    return "padding-left:65px"
                }
            },
            b(column) {
                if (column.columnIndex === 2) {
                    return "padding-left:60px"
                } else if (column.columnIndex == 3) {
                    return "padding-left:65px"
                }
            }
        },
        computed: {
            //通过watch监测middleNotice监测到的新旧值是一样的但计算属性可以得到不同的值，把middleNotice赋值给计算属性test，监测test就行 
            test() {
                return JSON.parse(JSON.stringify(this.middleNotice))
            }
        },
        //深度监视 tableData的变化，并将其存在浏览器中，用户下次打开时得到的是自己处理过的信息
        watch: {
            tableData: {
                deep: true, //注意要开深度监视
                handler(value) {
                    window.localStorage.setItem('tableData', JSON.stringify(value));
                }
            },
            middleNotice: {
                deep: true,
                handler(value) {
                    //将middleNotice保存在浏览器，每次刷新页面就不会影响页面对数据库的正常更新
                    localStorage.setItem('middleNotice', JSON.stringify(value))
                }
            },
            test: {
                deep: true,
                handler(value, oldValue) {
                    //当数据库新添加数据时找到新添加的数据 更新给tableData
                    if (!JSON.parse(window.localStorage.getItem('tableData'))) {
                        this.tableData = oldValue
                        return
                    }
                    if (value.length - oldValue.length > 0) {
                        let flag = false
                        value.forEach(Item => {
                            oldValue.forEach(item => {
                                if (Item.createtime == item.createtime) {
                                    flag = true
                                    return
                                }
                            })
                            if (!flag) {
                                this.tableData.unshift(Item)
                            }
                        })
                    }
                    //当数据库删除数据时找到删除的数据 更新给tableData，让其删除
                    else if (value.length - oldValue.length < 0) {
                        let a = false
                        oldValue.forEach(Item => {
                            value.forEach(item => {
                                if (Item.createtime == item.createtime) {
                                    a = true
                                    return
                                }
                            })
                            if (!a) {
                                this.tableData = this.tableData.filter(k => {
                                    return k.createtime != Item.createtime
                                })
                            }
                        })

                    }
                }
            }
        }
    }
</script>

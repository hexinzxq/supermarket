<template>
    <div class="bottom-bar">
        <div class="check-content">
            <check-button :is-checked="isSelectAll" 
            class="check-button"
            @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="price">合计:{{totalPrice}}</div>
        <div class="calculate" @click="caluClick">
            去计算({{checkLength}})
        </div>

    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton'

    import { mapGetters } from "vuex"


    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(['cartList']),
            totalPrice() {
                return "￥" + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue + item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.cartList.filter(item => {
                    return item.checked
                }).length
            },
            isSelectAll() {
                // return !(this.cartList.filter(item => {
                //     !item.checked
                // }).length)
                if (this.cartList.length === 0) {
                    return false
                }
                return !(this.cartList.find(item => {
                    return !item.checked
                }))

            }

        }, 
        methods: {
            checkClick(){
                // 已经全部选中，点击切换为全不选
                if(this.isSelectAll){
                    this.cartList.forEach(element => {
                        element.checked=false;
                        
                    });
                }
                else{ 
                    this.cartList.forEach(element => {
                        element.checked=true;
                        
                    });
                }
                // this.cartList.forEach(element => {
                //         element.checked=!this.isSelectAll; 
                //     });
            },
            caluClick(){
                
            }
        }

    }
</script>

<style scoped>
    .bottom-bar {
        position: relative;
        display: flex;
        height: 40px;
        background-color: #eee;
        line-height: 40px;
        font-size: 14px;
    }

    .check-content {
        width: 60px;
        display: flex;
        align-items: center;
        margin-left: 10px;

    }

    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        flex: 1;

        margin-left: 30px;
    }

    .calculate {
        text-align: center;
        width: 90px;
        color: #fff;
        background-color: red;
    }
</style>
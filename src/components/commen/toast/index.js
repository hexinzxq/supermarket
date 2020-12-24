import Toast from 'components/commen/toast/Toast'

const obj ={}
// 不用导入Vue ，会自动将Vue传入
obj.install=function(Vue){
    
    // document.body.appendChild(Toast.$el);
    // Vue.prototype.$toast=Toast


    // 创建组件构造器
    const ToastConstructor =Vue.extend(Toast);

    // 用new的方式创建组件对象
    const toast= new ToastConstructor()

    // 将组件对象挂载到某个元素
    toast.$mount(document.createElement('div'))

    //toast.$el  对应的就是上面的div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast=toast



}
export default obj
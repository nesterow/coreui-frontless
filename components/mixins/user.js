export default (mix = {}) => ({
    ...mix,
    onRendered(){
        this.update({
            user: this.globals || {}
        })
    }
})
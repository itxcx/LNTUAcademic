var app = getApp();
Page({
    data: {
        originalPassword: null,
        newPassword: null,
        confirmPassword: null
    },
    onLoad: function (options) {
        
    },
    onShow: function () {
       
    },
    inputOriginalPassword: function (e) {
        this.setData({
            originalPassword: e.detail.value
        })
    },
    inputNewPassword: function (e) {
        this.setData({
            newPassword: e.detail.value
        })
    },
    inputConfirmPassword: function (e) {
        this.setData({
            confirmPassword: e.detail.value
        })
    },
    //校验密码格式
    isPasswordFormatValid: function (password) {
        var that = this;
        if (password == null || password == "" || password.length < 1 || password.length > 18) {
            return false;
        } else {
            return true;
        }
    },
    //校验密码是否为空
    isPasswordFormatValid: function (password) {
        var that = this;
        if (password != null && password != "") {
            return true;
        } else {
            return false;
        }
    },
    //校验密码
    validatePassword: function () {
        var that = this;
        if (!that.isPasswordFormatValid(that.data.originalPassword)) {
            app.showToast("原密码为空或格式不正确", false);
            return false;
        } else if (!that.isPasswordFormatValid(that.data.newPassword)) {
            app.showToast("新密码为空或格式不正确", false);
            return false;
        } else if (!that.isPasswordFormatValid(that.data.confirmPassword)) {
            app.showToast("确认密码为空或格式不正确", false);
            return false;
        } else if (that.data.newPassword == that.data.originalPassword) {
            app.showToast("新密码不能和原密码相同", false);
            return false;
        } else if (that.data.newPassword != that.data.confirmPassword) {
            app.showToast("两次输入新密码不一致", false);
            return false;
        } else {
            return true;
        }
    },
    modifyPassword: function () {
        var that = this;
        if (that.validatePassword()) {
            wx.request({
                url: app.globalData.modifyPasswordUrl,
                data: {
                    stuId: app.globalData.stuId,
                    originalPassword: that.data.originalPassword,
                    newPassword: that.data.newPassword,
                },
                method: 'GET',
                header: {
                    Authorization: app.globalData.authorization,
                    username: app.globalData.stuId
                },
                success: function (res) {
                    if (res.data.result == "success") {
                        app.showToast("修改密码成功", true);
                        app.navigateBack();
                    } else {
                        app.showToast("密码错误，请重新确认", false);
                    }
                },
                fail: function (res) {
                    app.showToast("请求失败，请稍后重试", false);
                    app.navigateBack();
                }
            })
        }
    }
})
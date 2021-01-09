/**
 * Created by xiaoyu.li on 2018/3/7.
 */
module.exports = {
    business: {
        desc:console.log('业务数据库：开发'),
        connectionLimit: 10,
        host: 'rm-wz9x7fa3f3bj002084o.mysql.rds.aliyuncs.com',
        port: 3306,
        user: 'coupon798',
        password: 'eesJ2kCq6owQ5b2n',
        database: 'coupon798-dev',
        charset: 'utf8mb4',
        debug: false,
        multipleStatements:true
    },
    readonly: {
        desc:console.log('只读数据库：开发'),
        connectionLimit: 10,
        host: 'gtc-dev-test.cgdgyfnfqz2r.ap-northeast-1.rds.amazonaws.com',
        port: 3306,
        user: 'gtc',
        password: '47lM6FWjBuhRjxjf',
        database: 'gtc-dev',
        charset: 'utf8mb4',
        debug: false,
        multipleStatements:true
    }

};
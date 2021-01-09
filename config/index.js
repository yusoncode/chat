/**
 * Created by xiaoyu.li on 2018/3/7.
 */
var env = process.env.NODE_ENV || 'local';
module.exports = {
    mysql: require('./' + env + '/Mysql'),
    redis: require('./' + env + '/Redis'),
    common: require('./' + env + '/Common')
};
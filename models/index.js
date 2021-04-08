const Parent=require('./Parent')
const Child=require('./Child')
const Clothing=require('./Clothing')
const Event=require('./Event')


Parent.hasMany(Child);
Child.belongsTo(Parent);

Child.hasMany(Clothing);
Clothing.belongsTo(Child);

Child.hasMany(Event);
Event.belongsTo(Child);

module.exports={
    Parent,
    Child,
    Clothing,
    Event
}
import CommandInterceptor from 'diagram-js/lib/command/CommandInterceptor';
import inherits from 'inherits';
import { is } from '../datamodelmodeler/util/ModelUtil';

export default function Mediator() {
    this.OlcModelerHook.mediator = this;
}

Mediator.prototype.addedState = function (event) {
    var state = event.context.shape.businessObject;
    var clazz = state.$parent;
    console.log('added state named \"', state.name, '\" with id \"', state.id, '\" to class named \"', clazz.name, '\" with id \"', clazz.id, "\"");
}

Mediator.prototype.deletedState = function (event) {
    var state = event.context.shape.businessObject;
    var clazz = state.$parent;
    console.log('removed state named \"', state.name, '\" with id \"', state.id, '\" from class named \"', clazz.name, '\" with id \"', clazz.id, "\"");
}

Mediator.prototype.OlcModelerHook = function (eventBus, olcModeler) {
    CommandInterceptor.call(this, eventBus);
    this.mediator = this.__proto__.constructor.mediator;
    this.mediator.olcModelerHook = this;
    this._eventBus = eventBus;
    this.olcModeler = olcModeler;

    this.executed([
        'shape.create'
    ], event => {
        if (is(event.context.shape, 'olc:State')) {
            this.mediator.addedState(event);
        }
    });
    this.executed([
        'shape.delete'
    ], event => {
        if (is(event.context.shape, 'olc:State')) {
            this.mediator.deletedState(event);
        }
    });
}
inherits(Mediator.prototype.OlcModelerHook, CommandInterceptor);

Mediator.prototype.OlcModelerHook.$inject = [
    'eventBus',
    'olcModeler'
];
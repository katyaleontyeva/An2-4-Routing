// Декоратор класса принимает конструктор класса

// Чтобы не отписываться в классе через ngOnDestroy
// Задает имя свойства где находится подписка
export function AutoUnsubscribe(subName: string = 'sub') {
  return function (constructor) {
    // Берем метод конструктора ngOnDestroy
    const original = constructor.prototype.ngOnDestroy;

    // Переписываем метод
    constructor.prototype.ngOnDestroy = function () {
      const sub = this[subName];

      if (sub) {
        sub.unsubscribe();
      }

      // Если все-таки есть метод ngOnDestroy
      if (original && (typeof original === 'function')) {
        original.apply(this, arguments);
      }

      console.log(`Unsubscribe decorator is called. Subscription name is: ${subName}.`);
    };
  };
}

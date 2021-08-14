
function ClassDecorator() {
  return function (target) {
      console.log("I am class decorator");
  }
}
function MethodDecorator() {
  return function (target, methodName: string, descriptor: PropertyDescriptor) {
      console.log("I am method decorator");
  }
}
function ParamDecorator() {
  return function (target, methodName: string, paramIndex: number) {
      console.log("I am parameter decorator");
  }
}

function PropertyDecorator() {
  return function (target, propertyName: string) {
      console.log("I am property decorator");
  }
}

@ClassDecorator()
class Hello {
  @PropertyDecorator()
  message: string;

  @MethodDecorator()
  echo( @ParamDecorator() p1: string) { 
    console.log(this.message);
  }
}
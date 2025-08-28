#![allow(unused)] // inner attribute

extern crate rand; // extern crate declaration

mod utils {
    pub fn helper() -> &'static str {
        "Helper function"
    }
}

use std::collections::HashMap; // use declaration

fn main() {
    // Variable bindings
    let x: i32 = 42;
    let mut y = 10;

    // Constants and statics
    const PI: f64 = 3.14;
    static NAME: &str = "Rustacean";

    // Tuple, array, slice
    let tuple: (i32, bool) = (1, true);
    let array: [i32; 3] = [1, 2, 3];
    let slice: &[i32] = &array[..];

    // Struct
    struct Point { x: i32, y: i32 }
    let p = Point { x: 1, y: 2 };

    // Enum and match
    enum Color { Red, Green, Blue }
    let c = Color::Red;
    match c {
        Color::Red => println!("Red"),
        Color::Green => println!("Green"),
        Color::Blue => println!("Blue"),
    }

    // Control flow: if, else, loop, while, for
    if x > y {
        println!("x is greater");
    } else {
        println!("y is greater or equal");
    }

    loop {
        break;
    }

    while y > 0 {
        y -= 1;
    }

    for i in 0..3 {
        println!("{}", i);
    }

    // Function call
    println!("{}", utils::helper());

    // Reference and dereference
    let r = &x;
    let z = *r;

    // Pattern matching with let
    let (a, b) = tuple;

    // Closure
    let add = |a: i32, b: i32| a + b;
    println!("{}", add(2, 3));

    // Trait, impl, generics
    trait Drawable {
        fn draw(&self);
    }

    impl Drawable for Point {
        fn draw(&self) {
            println!("Drawing at ({}, {})", self.x, self.y);
        }
    }

    p.draw();

    // Result, Option, and error handling
    fn may_fail(ok: bool) -> Result<i32, &'static str> {
        if ok { Ok(1) } else { Err("fail") }
    }

    match may_fail(true) {
        Ok(val) => println!("Success: {}", val),
        Err(e) => println!("Error: {}", e),
    }

    let maybe = Some(5);
    if let Some(v) = maybe {
        println!("Value: {}", v);
    }

    // Macro usage
    macro_rules! say_hello {
        () => {
            println!("Hello from macro!");
        };
    }
    say_hello!();

    // Unsafe block
    unsafe {
        let ptr = array.as_ptr();
        println!("First element: {}", *ptr);
    }

    // Raw string, byte string, char, and unicode
    let raw = r#"Raw string with "quotes""#;
    let byte_str = b"bytes";
    let ch: char = '🦀';

    // Type alias
    type Int = i32;
    let num: Int = 7;

    // Generics with lifetime
    fn print_ref<'a, T: std::fmt::Debug>(x: &'a T) {
        println!("{:?}", x);
    }
    print_ref(&num);

    // Iterator and map
    let doubled: Vec<_> = array.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled);

    // HashMap
    let mut map = HashMap::new();
    map.insert("key", 123);
    println!("{:?}", map);
}

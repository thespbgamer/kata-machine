import RingBuffer from "@code/RingBuffer";

test("RingBuffer", function () {
  const buffer = new RingBuffer<number>(5);

  buffer.push(5);
  expect(buffer.pop()).toEqual(5);
  expect(buffer.pop()).toEqual(undefined);

  buffer.push(42);
  buffer.push(9);
  expect(buffer.pop()).toEqual(42);
  expect(buffer.pop()).toEqual(9);
  expect(buffer.pop()).toEqual(undefined);

  buffer.push(42);
  buffer.push(9);
  buffer.push(12);
  expect(buffer.get(2)).toEqual(12);
  expect(buffer.get(1)).toEqual(9);
  expect(buffer.get(0)).toEqual(42);
  buffer.pop();
  buffer.pop();
  buffer.pop();

  //This will test overwriting
  buffer.push(1);
  expect(buffer.get(0)).toEqual(1);
  buffer.push(2);
  buffer.push(3);
  buffer.push(4);
  buffer.push(5);
  buffer.push(6);
  expect(buffer.get(0)).toEqual(2);
  expect(buffer.get(1)).toEqual(3);
  expect(buffer.get(2)).toEqual(4);
  expect(buffer.get(3)).toEqual(5);
  expect(buffer.get(4)).toEqual(6);
});

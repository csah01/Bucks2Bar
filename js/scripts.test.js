// bucks2bar/js/scripts.test.js

const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[\d]).{8,}$/;

test("valid username with at least 1 capital letter, 1 special character, 1 number, and at least 8 characters long", () => {
  expect(regex.test("Password1!")).toBe(true);
});

test("invalid username without a capital letter", () => {
  expect(regex.test("password1!")).toBe(false);
});

test("invalid username without a special character", () => {
  expect(regex.test("Password1")).toBe(false);
});

test("invalid username without a number", () => {
  expect(regex.test("Password!")).toBe(false);
});

test("invalid username with less than 8 characters", () => {
  expect(regex.test("Pass1!")).toBe(false);
});

// Mocking the DOM elements and functions for the download button click event
/*document.body.innerHTML = `
  <canvas id="myBarChart"></canvas>
  <button id="download">Download</button>
`;

const downloadButton = document.querySelector('#download');
const canvas = document.querySelector('#myBarChart');
canvas.toDataURL = jest.fn(() => 'data:image/png;base64,mockImageData');
const link = {
  href: '',
  download: '',
  click: jest.fn()
};
document.createElement = jest.fn(() => link);

require('./scripts.js');

test("download button click event should create a link and trigger download", () => {
  downloadButton.click();

  expect(canvas.toDataURL).toHaveBeenCalledWith('image/png');
  expect(link.href).toBe('data:image/png;base64,mockImageData');
  expect(link.download).toBe('chart.png');
  expect(link.click).toHaveBeenCalled();
}); */


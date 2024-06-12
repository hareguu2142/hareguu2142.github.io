let imagePaths = ["img/photo1.jpg", "img/핸드폰.jpg"]; // Add more images as needed
let images = [];
let imageNames = ["Image 1", "핸드폰"]; // Make sure the names match the order of imagePaths
let currentImage;
let currentImageName;
let overlayColor;
let maskGraphics;
let isMouseDragging = false;
let displayImageName = false;
let eraseLimit = 150000; // Total area that can be erased
let erasedArea = 0;

function preload() {
  images = imagePaths.map((imgPath) => loadImage(imgPath));
}

function setup() {
  createCanvas(1024, 768); // Adjust size as needed
  maskGraphics = createGraphics(width, height);
  selectNewImage();
  
  // Single instance of the "Show Name" button
  let showNameButton = createButton("정답 확인");
  showNameButton.position(10, 10);
  showNameButton.mousePressed(() => {
    displayImageName = true;
    drawOverlay();
  });

  // Single instance of the "New Image" button
  let newImageButton = createButton("다른 그림");
  newImageButton.position(10, 40);
  newImageButton.mousePressed(() => {
    displayImageName = false;
    selectNewImage();
  });
}

function draw() {
  background(255);
  image(currentImage, 0, 0, width, height);
  image(maskGraphics, 0, 0);

  if (displayImageName) {
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(128);
    text(currentImageName, width / 2, height / 2);
  }
}

function selectNewImage() {
  const randomIndex = floor(random(images.length));
  currentImage = images[randomIndex];
  currentImageName = imageNames[randomIndex];
  overlayColor = color(random(255), random(255), random(255));
  erasedArea = 0; // Reset erased area counter
  drawOverlay();
}

function drawOverlay() {
  maskGraphics.clear();
  maskGraphics.fill(overlayColor);
  maskGraphics.noStroke();
  maskGraphics.rect(0, 0, width, height);
}

function mousePressed() {
  isMouseDragging = true;
}

function mouseReleased() {
  isMouseDragging = false;
}

function mouseDragged() {
  if (isMouseDragging && erasedArea < eraseLimit) {
    let eraserSize = 50; // Adjust the size of the eraser
    let newArea = PI * (eraserSize / 2) ** 2;

    if (erasedArea + newArea <= eraseLimit) {
      maskGraphics.erase();
      maskGraphics.ellipse(mouseX, mouseY, eraserSize, eraserSize);
      maskGraphics.noErase();
      erasedArea += newArea;
    } else {
      let remainingArea = eraseLimit - erasedArea;
      let remainingRadius = sqrt(remainingArea / PI);

      maskGraphics.erase();
      maskGraphics.ellipse(mouseX, mouseY, remainingRadius * 2, remainingRadius * 2);
      maskGraphics.noErase();
      erasedArea = eraseLimit;
    }
  }
}

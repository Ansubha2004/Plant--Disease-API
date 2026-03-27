const int greenPin = 13; // Green LED digital pin 13
const int redPin = A0;   // Red LED analog pin A0, used as digital

void setup() {
  pinMode(greenPin, OUTPUT);
  pinMode(redPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char status = Serial.read();
    if (status == '1') {
      // Green ON, Red OFF for 7 seconds
      digitalWrite(greenPin, HIGH);
      digitalWrite(redPin, LOW);
      delay(7000); // 7000 ms = 7 sec
      digitalWrite(greenPin, LOW);
      digitalWrite(redPin, LOW);
    } else if (status == '0') {
      // Red ON, Green OFF for 7 seconds
      digitalWrite(greenPin, LOW);
      digitalWrite(redPin, HIGH);
      delay(7000); // 7000 ms = 7 sec
      digitalWrite(greenPin, LOW);
      digitalWrite(redPin, LOW);
    }
  }
}

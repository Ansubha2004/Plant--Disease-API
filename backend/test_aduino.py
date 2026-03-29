import serial
import time

def test_arduino():
    try:
        arduino = serial.Serial('COM3', 9600)
        time.sleep(2)
        
        print("Testing Red LED...")
        arduino.write(b"0")
        time.sleep(2)
        
        print("Testing Green LED...")
        arduino.write(b"1")
        time.sleep(2)
        
        arduino.close()
        print("✅ Arduino test successful!")
    except Exception as e:
        print(f"❌ Arduino test failed: {e}")

if __name__ == "__main__":
    test_arduino()
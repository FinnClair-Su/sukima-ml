from PIL import Image
import os

def crop_image():
    img_path = '/Users/alicekuonji/Code/Project Gap/sukima-ml/static/img/alipay_receiveMoney.png'
    
    if not os.path.exists(img_path):
        print(f"Error: File not found at {img_path}")
        return

    try:
        with Image.open(img_path) as img:
            width, height = img.size
            print(f"Original size: {width}x{height}")
            
            # Calculate target height based on WeChat Pay aspect ratio (924/966 ~= 0.9565)
            # Or just use the calculated value from thought process: 964
            # Let's be precise: WeChat is 924w x 966h. Ratio w/h = 0.9565217
            # Alipay width is 922. Target height = 922 / (924/966) = 922 * 966 / 924 = 963.9
            
            target_height = 964
            
            if height <= target_height:
                print("Image is already short enough, no cropping needed.")
                return

            # Crop from top (left, top, right, bottom)
            # We want to keep the top part, so crop box is (0, 0, width, target_height)
            box = (0, 0, width, target_height)
            cropped_img = img.crop(box)
            
            cropped_img.save(img_path)
            print(f"Successfully cropped image to {width}x{target_height}")
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    crop_image()

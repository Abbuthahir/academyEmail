import { Component } from '@angular/core';
import { EmailComposer, EmailComposerOptions } from '@awesome-cordova-plugins/email-composer/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { isPlatform } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  hasAccount = false;
  currentImage: any;
  imageData: any;

  constructor(private emailComposer: EmailComposer) { }

  async checkAccount() {
    this.hasAccount = await this.emailComposer.hasAccount();
  }
  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });
    this.imageData = image.base64String;
    console.log('imageData',typeof(this.imageData));
    this.currentImage = `data:image/jpeg;base64, ${image.base64String}`
  }

  async openEmail() {
    const email: EmailComposerOptions ={
      to: 'abbuthahir04@gmail.com',
      cc: 'snthiru2000@gmail.com',
      subject: 'My cool Image',
      body: 'Hello World'
    };
    await this.emailComposer.open(email);
   }
}

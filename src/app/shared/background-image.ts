import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, catchError } from 'rxjs/operators';
// import { environment } from '../../environments/environment.development';
// import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundImage {
  // The commented out lines makes API calls to retrieve background image.
  // Switching to using image URLs significantly reduces loading time

  // private API_KEY = environment.pixabayKey;
  // private API_URL = 'https://pixabay.com/api/';

  // // Random category list
  // private categories = [
  //   'beach', 'city', 'forest', 'mountain', 'technology', 'animals', 'ocean', 'space', 'flowers'
  // ];

  // constructor(private http: HttpClient) {}

  // getImage() {
  //   const query = this.categories[Math.floor(Math.random() * this.categories.length)];
  //   const url = await fetch( `${this.API_URL}?key=${this.API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&safesearch=True&per_page=10`,{method:"HEAD"})

  //   return this.http.get<any>(url).pipe(
  //     map(response => {
  //       // Check if there are any hits
  //       if (response.totalHits > 0) {
  //         const randomIndex = Math.floor(Math.random() * response.hits.length);
  //         return response.hits[randomIndex].largeImageURL;  // Return a random image URL from Pixabay
  //       } else {
  //         // Return a default image if no images are found
  //         return "https://cdn.pixabay.com/photo/2025/07/16/07/19/british-shorthair-9717301_1280.jpg";
  //       }
  //     }),
  //     catchError(error => {
  //       console.error('Error fetching image:', error);
  //       return of(null);  // Return null in case of error
  //     })
  //   );
  // }


  private bgs = [
    "https://pixabay.com/get/g2202f2516a8d2d55b314811c6b6cb91f65825f8ee151414c1aae2bb3c4c4812387c04f941fb69b3f2c7aa08ebdf9a3e9f14e8949fc5ef90d2e412da2a4a39517_1920.jpg",
    "https://pixabay.com/get/ge72c4dde47c0c23475b5ed903c8a0753b0ae67e12a3aa00c744065a3882be20b5eb840e171e32b1e22d69bc4b2c391134a8b19255c254e14a61d4f15a1cf20b1_1920.jpg",
    "https://pixabay.com/get/gf7756b0c0b26eb976ac0bacb9fda91e6f6deadd2138198b2f40282f7747469c19b016055b93be2efda8093b0e793c86b9032303b22bfb8687e1db782cbbd8ddd_1920.jpg",
    "https://pixabay.com/get/g974c6b412c845b164b01267c3ae5af904d408caceef8dab51b13a581e84741de427d44d6c66a249b7b98436106e82c940a03b5a7df820c7edd4013f30951f79d_1920.jpg",
    "https://pixabay.com/get/g301206ca4872eacb6a5bde8accd6a2bb2e3d23b075bd7ef08124f358cbbd0796df2d775989c3d22679846145b166fc4c74d4a52357d79e1f1319e7b98a40279f_1920.jpg",
    "https://pixabay.com/get/ga58807e7f7925647fb8c1be38a4e225dd54a040ba10c91fe9df6bf149a07c1c53165fe054840754bc14b28b9875a779edb022981e462ba989cfc420859e34595_1920.jpg",
    "https://pixabay.com/get/g4fd1aa798c44e5e62f9771c9fc5889f73ce82e5d241745045e0b5b39d1a8371ec476aaaa4a913bc0f088338fac7967fb4015febd9ee9ac8759d3bcb49b2625cb_1920.jpg",
    "https://pixabay.com/get/g25655132975d81e6c10af6aadab97bab274341e00f409981a8ba33184d58ffad3a9523137ac67e03dd84656c8ae914a3a01a956642ba4eedcca481f844709b09_1920.jpg",
    "https://pixabay.com/get/gd6467179e89da751e0f31eba50a605426bcc39a2a2c3d10c6766ae04cada428f8acc0fd6d84e50640467683704ef5f30e32b0754e0803a68ab7285ab153cc08e_1920.jpg",
    "https://cdn.pixabay.com/photo/2017/03/07/23/33/technology-2125547_1280.jpg",
    "https://pixabay.com/get/gdd615c4bf3f56616f153786229bab6043363e8afef185078d7f35373daae1af2e59b5ff12b283963592cd0e5ed1e12206cef2723acdc409f9a2f4e17f831f37a_1920.jpg",
    "https://pixabay.com/get/g742aa65d59b669a403113d3cb82ec7470d524df36ebb8e602a30d08369266617e61df7b35863c9895972f4386d6a1263.jpg",
    "https://cdn.pixabay.com/photo/2018/08/09/10/46/telephone-3594206_1280.jpg",
    "https://pixabay.com/get/gc0daf7abed905b96887e2e95e9b0e4aa8e5e6c8ce6851fcdf2d70fe4bd7eedbf8ac8a2cfa280883dc7e6a6f00cc4ebf911445ce70f9db3170fdb75ec7ef00e64_1920.jpg",
    "https://pixabay.com/get/g83e6f9770417d2ebefc53172b1d047f2dc7be224d93db35574e431d4349e1ebf47d2475392373594413e06e5d575542e.jpg",
    "https://pixabay.com/get/g9e6e83d150c8718d3b02875c333d2b5a1e90f06ce14f863b352587bd8ce7013299a7406abe56967342d21e0cbe36b4ae8244ce55f9bd203d0e10bec4018fb7e0_1920.jpg",
    "https://pixabay.com/get/g50bb1e79554ac0106ab8c13aa583bc387b682eba62a4424ebfc169a43847cfdd8b25d78c6ba97aed212aa5c773d05111ce11034ec533590b784f1271ae807ff0_1920.jpg",
    "https://pixabay.com/get/gc4317b52fcedb219d8ecb6d40b2cc140cbc796270964164178c393b87663e9fa6a924945758e087a556a7a3b88e297a3d4f3bd8825d5515085aba5bf307bfaca_1920.jpg",
    "https://pixabay.com/get/g12ad0c8bb3f899acfd39dbcde377b1cc3eb5564da9404dbebc3177cc3293ecb6742a1d06ada879d2c417922918efb551.jpg",
    "https://cdn.pixabay.com/photo/2019/01/27/22/33/chipmunk-3959206_1280.jpg",
    "https://pixabay.com/get/ge607264187804b6d7174f1778fec728c57a5c61decc95affdfe9b2f05823e24a7eb39cdb1ef764c08d0b22a0eb2affd87dbfd5944a94ea983668164c20446dbb_1920.jpg",
    "https://pixabay.com/get/gaffbb3e364d24966933c4094a2aab7fce6de5a240382277a9b5d74f6f6fb8ecfd4ee3ad9b70ce7056ce4f7b3ef569d03.jpg",
    "https://pixabay.com/get/g4fca81277c719c755f4285bfcbae4b5ceb66cc1f253a46ea9cdd8246d714c49b26146f0594d54101bc03492a57466ee7600b7eac3290aee55573a053dff59b09_1920.jpg",
    "https://pixabay.com/get/g048b7d42992c4f76fc78fa278a716dd0c9ef2db408408ff623dc3f66b2d5e972741e1c398ab3ebeb8e62eb9f36bb0e5d1d74866dfd7bc4516c076a453af415ac_1920.jpg",
    "https://pixabay.com/get/g76d8e608d86c27cec2abb3394979f7de4a4ed72503a1ee45d45b3da7077c85fec388f4dda0c7ad6098f83f5f332d30109ae52394f03d7c53fcff4c407518315f_1920.jpg",
    "https://pixabay.com/get/ga8552dd0811ee453b4e727bca1a2f4a2cf3b303bf49ad9dec2a79ef37507505341f0ae6906e6241a981b1321ae0e2b4a25107497129b62f71b247ecf4cc2db3e_1920.jpg",
    "https://pixabay.com/get/g956116d54e97849ba41115909b1723dc868daeacaae40332f3b81294757b7db7f4050fc33b99b56b17731dd9e2880e549e3b2924de73bb5ff8c057ac98d9dffc_1920.jpg"
  ]

  private ind: number = 0;

  getImage() {
    let new_ind = Math.floor(Math.random() * this.bgs.length);
    while (new_ind === this.ind) {
      new_ind = Math.floor(Math.random() * this.bgs.length);
    }
    this.ind = new_ind;
    return this.bgs[this.ind];
  }

}

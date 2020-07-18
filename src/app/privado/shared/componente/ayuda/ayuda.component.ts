import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/AppSettings';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ayuda',
  template: `
  <div class="embed-container">
    <iframe width="560" height="315" [src]="url" frameborder="0" allowfullscreen></iframe>
  </div> `,
  styles: [`
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
}
.embed-container iframe {
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
}`
  ]
})
export class AyudaComponent implements OnInit {
  url: SafeResourceUrl;


  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getIframeUrl();
  }

  getIframeUrl(): SafeResourceUrl {
    this.url = this.domSanitizer.bypassSecurityTrustResourceUrl(AppSettings.ENDPOINT_MANUAL_USUARIO);
    return this.url;
  }

}

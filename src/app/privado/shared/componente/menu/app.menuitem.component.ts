import { Component, Input, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './app.menu.service';
import { HomeLayoutComponent } from '../../../home/home-layout/home-layout.component';
import { AppSettings } from '../../../../AppSettings';
import { GeneralComponent } from '../../../../shared/servicio/general.component';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
    /* tslint:disable:component-selector */
    selector: '[app-menuitem]',
    /* tslint:enable:component-selector */
    template: `
          <ng-container>
              <a style="display: flex; width: 100%;" [style.justify-content]=" slimMenu ? 'center' : 'space-between'" [attr.href]="item.url" (click)="itemClick($event)" *ngIf="!item.routerLink || item.items"
                 (mouseenter)="onMouseEnter()" (keydown.enter)="itemClick($event)" [attr.target]="item.target" [attr.tabindex]="0">
                 <div [ngStyle]="{'width: 90%': item.items}" >
                     <i [ngClass]="item.icon ? item.icon : 'fa fa-fw fa-bookmark-o'"></i>
                      <span>{{item.label}}</span>
    				  <span class="menuitem-badge" *ngIf="item.badge">{{item.badge}}</span>
                 </div>
                 <div [ngStyle]="{'width: 10%': item.items}" style="display: flex; flex-direction: column; justify-content: center;"  *ngIf="item.items">
                     <i class="fa fa-fw fa-angle-down" *ngIf="item.items"></i>
                </div>
              </a>
              <a style="display: flex; width: 100%;" [style.justify-content]=" slimMenu ? 'center' : 'space-between'" (click)="itemClick($event)" (mouseenter)="onMouseEnter()" *ngIf="item.routerLink && !item.items"
                  [routerLink]="item.routerLink" routerLinkActive="active-menuitem-routerlink"
                  [routerLinkActiveOptions]="{exact: true}" [attr.target]="item.target" [attr.tabindex]="0">
                  <div [ngStyle]="{'width: 90%': item.items}" >
                      <i [ngClass]="item.icon ? item.icon : 'fa fa-fw fa-bookmark-o'"></i>
    				  <span>{{item.label}}</span>
    				  <span class="menuitem-badge" *ngIf="item.badge">{{item.badge}}</span>
                  </div>
                  <div [ngStyle]="{'width: 10%': item.items}" style="display: flex; flex-direction: column; justify-content: center;"  *ngIf="item.items">
                      <i class="fa fa-fw fa-angle-down" *ngIf="item.items"></i>
                  </div>
              </a>
			  <div class="layout-menu-tooltip">
				  <div class="layout-menu-tooltip-arrow"></div>
				  <div class="layout-menu-tooltip-text">{{item.label}}</div>
			  </div>
              <ul *ngIf="item.items && (active || animating)" (@children.done)="onAnimationDone()"
                  [@children]="(app.slimMenu && root && !app.isMobile()) ? (active ? 'visible' : 'hidden') :
                  (active ? 'visibleAnimated' : 'hiddenAnimated')">
                  <ng-template ngFor let-child let-i="index" [ngForOf]="item.items">
                      <li app-menuitem [item]="child" [index]="i" [parentKey]="key" [class]="child.badgeClass"></li>
                  </ng-template>
              </ul>
          </ng-container>
      `,
    host: {
        '[class.active-menuitem]': 'active'
    },
    animations: [
        trigger('children', [
            state('void', style({
                height: '0px'
            })),
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                height: '*',
                'z-index': 100
            })),
            state('hidden', style({
                height: '0px',
                'z-index': '*'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('void => visibleAnimated, visibleAnimated => void',
                animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMenuitemComponent implements OnInit, OnDestroy {

    @Input() item: any;

    @Input() index: number;

    @Input() root: boolean;

    @Input() parentKey: string;

    @Input() slimMenu: boolean;

    animating: boolean;

    active = false;

    menuSourceSubscription: Subscription;

    menuResetSubscription: Subscription;

    key: string;

    constructor(public app: HomeLayoutComponent, public router: Router, private cd: ChangeDetectorRef,
        public generalComponent: GeneralComponent, private spinner: SpinnerVisibilityService, private menuService: MenuService) {
        this.menuSourceSubscription = this.menuService.menuSource$.subscribe(key => {
            // deactivate current active menu
            if (this.active && this.key !== key && key.indexOf(this.key) !== 0) {
                this.active = false;
            }
        });

        this.menuResetSubscription = this.menuService.resetSource$.subscribe(() => {
            this.active = false;
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(params => {
                if (this.app.slimMenu) {
                    this.active = false;
                } else {
                    if (this.item.routerLink) {
                        this.updateActiveStateFromRoute();
                    } else {
                        this.active = false;
                    }
                }
            });
    }

    ngOnInit() {
        if (!this.app.slimMenu && this.item.routerLink) {
            this.updateActiveStateFromRoute();
        }

        this.key = this.parentKey ? this.parentKey + '-' + this.index : String(this.index);
    }

    updateActiveStateFromRoute() {
        this.active = this.router.isActive(this.item.routerLink[0], this.item.items ? false : true);
    }

    itemClick(event: Event) {
        // avoid processing disabled items
        if (this.item.disabled) {
            event.preventDefault();
            return true;
        }

        // navigate with hover in horizontal mode
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // notify other items
        this.menuService.onMenuStateChange(this.key);

        // execute command
        if (this.item.command) {
            this.item.command({originalEvent: event, item: this.item});
        }

        // toggle active state
        if (this.item.items) {
            this.active = !this.active;
            this.animating = true;
        } else {
            // activate item
            this.active = true;

            // hide overlay menus
            if (this.app.overlayMenu || this.app.isMobile()) {
                this.app.overlayMenuActive = false;
                this.app.mobileMenuActive = false;
            }

            // reset horizontal menu
            if (this.app.slimMenu) {
                this.menuService.reset();
            }

            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        if (this.item.other != undefined) {
            if (this.item.other != null && this.item.other.includes("RPT") || this.item.other.includes("REP")) {
              if (this.item.other.includes("RPTFM")) {
                 this.generalComponent.postDynamicForm(AppSettings._API_ENDPOINT_FOREST + "reportViewer/?id=" + this.item.other+(this.item.id?"&cid="+this.item.id:""), {});
              }
              else {
                this.generalComponent.postDynamicForm(AppSettings._API_ENDPOINT_FOREST + "forestReports/frameset", { __report: this.item.other + ".rptdesign", security: AppSettings.getToken() });
              }
              event.preventDefault();
              return false;
            }

            if (this.item.other != null && this.item.other.includes("TAB")) {
              this.generalComponent.postDynamicForm("../xuiComponent/formViewer.html?codForm=" + this.item.other.replace("/", ""), { security: AppSettings.getToken() });
              event.preventDefault();
              return false
            }

          }

          if (this.item.routerLink) {
            this.spinner.show();
            this.router.navigateByUrl('/home/dummy', { skipLocationChange: true }).then(() =>
              this.router.navigate(this.item.routerLink)
                .then(data => {
                  console.log('Route exists, redirection is done', this.item.routerLink[0]);
                  setTimeout(() => { this.spinner.hide(); }, 500);
                })
                .catch(e => {
                  this.spinner.hide();
                  console.log('Route not found, redirection stopped with no error raised', this.item.routerLink[0]);
                }));
          }
    }

    onMouseEnter() {
        // activate item on hover
        if (this.root && this.app.menuHoverActive && this.app.slimMenu && !this.app.isMobile()) {
            this.menuService.onMenuStateChange(this.key);
            this.active = true;
        }
    }

    onAnimationDone() {
        this.animating = false;
    }

    ngOnDestroy() {
        if (this.menuSourceSubscription) {
            this.menuSourceSubscription.unsubscribe();
        }

        if (this.menuResetSubscription) {
            this.menuResetSubscription.unsubscribe();
        }
    }
}

import { createElement, createTextNode } from '@textbus/browser';
export class Tab {
    constructor(style) {
        Object.defineProperty(this, "elementRef", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "viewContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "head", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "btnWrapper", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.elementRef = createElement('div', {
            classes: ['textbus-tab'],
            styles: Object.assign({ width: "100%", height: "100%" }, style),
            children: [
                this.head = createElement('div', {
                    classes: ['textbus-tab-head'],
                    children: [
                        this.btnWrapper = createElement('div', {
                            classes: ['textbus-tab-btn-wrapper']
                        })
                    ]
                }),
                this.viewContainer = createElement('div', {
                    classes: ['textbus-tab-view']
                })
            ]
        });
    }
    show(config) {
        this.btnWrapper.innerHTML = '';
        this.viewContainer.innerHTML = '';
        const btns = config.map((item, index) => {
            const btn = createElement('button', {
                classes: ['textbus-tab-btn'],
                children: [
                    createTextNode(item.label)
                ]
            });
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('textbus-tab-btn-active'));
                btn.classList.add('textbus-tab-btn-active');
                this.viewContainer.innerHTML = '';
                this.viewContainer.appendChild(item.view);
            });
            this.btnWrapper.appendChild(btn);
            if (index === 0) {
                btn.classList.add('textbus-tab-btn-active');
                this.viewContainer.appendChild(item.view);
            }
            return btn;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGV4dGJ1cy91dGlscy90YWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRSxNQUFNLE9BQU8sR0FBRztJQUtaLFlBQVksS0FBSztRQUpqQjs7Ozs7V0FBd0I7UUFDeEI7Ozs7O1dBQTJCO1FBQzNCOzs7OztXQUFrQjtRQUNsQjs7Ozs7V0FBd0I7UUFFcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFO1lBQ25DLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUN4QixNQUFNLEVBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxFQUFDLEtBQUssQ0FBQztZQUN4RCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUM3QixPQUFPLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDN0IsUUFBUSxFQUFFO3dCQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLEtBQUssRUFBRTs0QkFDbkMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUM7eUJBQ3ZDLENBQUM7cUJBQ0w7aUJBQ0osQ0FBQztnQkFDRixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQyxLQUFLLEVBQUU7b0JBQ3RDLE9BQU8sRUFBRSxDQUFDLGtCQUFrQixDQUFDO2lCQUNoQyxDQUFDO2FBQ0w7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsSUFBSSxDQUFDLE1BQU07UUFDUCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2xDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDcEMsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRTtnQkFDaEMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVCLFFBQVEsRUFBRTtvQkFDTixjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztpQkFDN0I7YUFDSixDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUMsQ0FBQztnQkFDaEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQsIGNyZWF0ZVRleHROb2RlIH0gZnJvbSAnQHRleHRidXMvYnJvd3Nlcic7XHJcbmV4cG9ydCBjbGFzcyBUYWIge1xyXG4gICAgZWxlbWVudFJlZjogSFRNTEVsZW1lbnQ7XHJcbiAgICB2aWV3Q29udGFpbmVyOiBIVE1MRWxlbWVudDtcclxuICAgIGhlYWQ6IEhUTUxFbGVtZW50O1xyXG4gICAgYnRuV3JhcHBlcjogSFRNTEVsZW1lbnQ7XHJcbiAgICBjb25zdHJ1Y3RvcihzdHlsZSkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudFJlZiA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHtcclxuICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRhYiddLFxyXG4gICAgICAgICAgICBzdHlsZXM6T2JqZWN0LmFzc2lnbih7d2lkdGg6XCIxMDAlXCIsaGVpZ2h0OlwiMTAwJVwifSxzdHlsZSksXHJcbiAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRhYi1oZWFkJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5idG5XcmFwcGVyID0gY3JlYXRlRWxlbWVudCgnZGl2Jywge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRhYi1idG4td3JhcHBlciddXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRhYi12aWV3J11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHNob3coY29uZmlnKSB7XHJcbiAgICAgICAgdGhpcy5idG5XcmFwcGVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICBjb25zdCBidG5zID0gY29uZmlnLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYnRuID0gY3JlYXRlRWxlbWVudCgnYnV0dG9uJywge1xyXG4gICAgICAgICAgICAgICAgY2xhc3NlczogWyd0ZXh0YnVzLXRhYi1idG4nXSxcclxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlVGV4dE5vZGUoaXRlbS5sYWJlbClcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bnMuZm9yRWFjaChiID0+IGIuY2xhc3NMaXN0LnJlbW92ZSgndGV4dGJ1cy10YWItYnRuLWFjdGl2ZScpKTtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCd0ZXh0YnVzLXRhYi1idG4tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbS52aWV3KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuV3JhcHBlci5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCd0ZXh0YnVzLXRhYi1idG4tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQoaXRlbS52aWV3KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYnRuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59Il19
export const CURSOR_CSS_STYLE = `
            puppeteer-mouse-pointer {
              pointer-events: none;
              position: absolute;
              top: 0;
              z-index: 10000;
              left: 0;
              width: 20px;
              height: 20px;
              background: rgba(0,0,0,.4);
              border: 1px solid white;
              border-radius: 10px;
              margin: -10px 0 0 -10px;
              padding: 0;
              transition: background .2s, border-radius .2s, border-color .2s;
            }
            puppeteer-mouse-pointer.button-1 {
              transition: none;
              background: rgba(0,0,0,0.9);
            }
            puppeteer-mouse-pointer.button-2 {
              transition: none;
              border-color: rgba(0,0,255,0.9);
            }
            puppeteer-mouse-pointer.button-3 {
              transition: none;
              border-radius: 4px;
            }
            puppeteer-mouse-pointer.button-4 {
              transition: none;
              border-color: rgba(255,0,0,0.9);
            }
            puppeteer-mouse-pointer.button-5 {
              transition: none;
              border-color: rgba(0,255,0,0.9);
            }
          `;

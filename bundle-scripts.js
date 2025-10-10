import { readFileSync } from 'fs';
import { resolve } from 'path';

export default function bundleScripts() {
  return {
    name: 'bundle-scripts',
    transformIndexHtml: {
      order: 'post',
      handler(html, { bundle }) {
        // Only transform in build mode (when bundle exists)
        if (bundle) {
          // Replace all individual script tags with single bundle (match ./js/ paths from build) - OPTIMIZED
          const scriptPattern = /<script src="\.\/js\/(jquery-3\.7\.1\.min|bootstrap\.bundle\.min|gsap|ScrollTrigger\.min|ScrollSmoother\.min|SplitText\.min|main|gsap-init)\.js"><\/script>\n?\s*/g;

          // Remove the comments and all individual scripts
          html = html.replace(/<!-- Development: Load scripts individually -->\n?\s*<!-- Production: Single bundled file -->\n?\s*/g, '');
          html = html.replace(scriptPattern, '');

          // Add single bundled script
          html = html.replace(
            '<script type="module"',
            '<script src="./js/bundle.min.js"></script>\n    <script type="module"'
          );
        }

        return html;
      }
    },
    generateBundle(options, bundle) {
      // Add the bundled script as an asset - OPTIMIZED (removed unused libraries)
      const scripts = [
        'assets/js/jquery-3.7.1.min.js',
        'assets/js/bootstrap.bundle.min.js',
        // GSAP Core and plugins (used for animations)
        'assets/js/gsap.js',
        'assets/js/ScrollTrigger.min.js',
        'assets/js/ScrollSmoother.min.js',
        'assets/js/SplitText.min.js',
        // Custom scripts
        'assets/js/main.js',
        'assets/js/gsap-init.js'
      ];

      let bundledScript = '/* Bundled JavaScript - All scripts concatenated */\n';
      scripts.forEach(scriptPath => {
        try {
          const content = readFileSync(resolve(scriptPath), 'utf-8');
          bundledScript += `\n/* ===== ${scriptPath} ===== */\n`;
          bundledScript += content;
          bundledScript += '\n';
        } catch (error) {
          console.warn(`Warning: Could not read ${scriptPath}:`, error.message);
        }
      });

      this.emitFile({
        type: 'asset',
        fileName: 'js/bundle.min.js',
        source: bundledScript
      });
    }
  };
}

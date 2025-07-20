// استيراد الحزم اللازمة
const puppeteer = require("puppeteer");
const xlsx = require("xlsx");
const fs = require("fs/promises");
const path = require("path");
const archiver = require("archiver");

const bagsURLs = [
  "https://newcopybrand.x.yupoo.com/categories/196776?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/461170?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/495711?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/587430?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/363974?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/149167?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/505883?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/537317?isSubCate=true",
  "https://newcopybrand.x.yupoo.com/categories/346661?isSubCate=true",
];

// const strapURLs = [
//   "https://newcopybrand.x.yupoo.com/categories/197256?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/294388?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89157?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/203855?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89158?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/149214?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/198172?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/218812?isSubCate=true",
// ];

// const shoesURLs = [
//   "https://newcopybrand.x.yupoo.com/categories/197236?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89106?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/232206?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/233317?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/378524?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89109?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/149174?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/388589?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/340968?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/322686?isSubCate=true",
// ];

// const clothesURLs = [
//   "https://newcopybrand.x.yupoo.com/categories/336373?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/196759?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89116?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/203853?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89117?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/149209?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/388529?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/218766?isSubCate=true",
// ];

// const clovesURLs = [
//   "https://newcopybrand.x.yupoo.com/categories/198884?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89170?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/203863?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/149177?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/211373?isSubCate=true",
// ];

// const scarfURLs = [
//   "https://newcopybrand.x.yupoo.com/categories/196761?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89153?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/203884?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/149210?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/198268?isSubCate=true",
// ];

// const walletsURLs = [
//   "https://newcopybrand.x.yupoo.com/categories/276454?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/461171?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/332326?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/149169?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/197440?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/218797?isSubCate=true",
// ];

// const seaClothesurls = [
//   "https://newcopybrand.x.yupoo.com/categories/196763?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/89119?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/203888?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/205908?isSubCate=true",
//   "https://newcopybrand.x.yupoo.com/categories/357018?isSubCate=true",
// ];

// ===================================================================================
// START: منطقة الإعدادات والتخصيص
// ===================================================================================

/**
 * @description تعريف فئات المنتجات والروابط الخاصة بكل فئة.
 * يمكنك إضافة أو تعديل الفئات والروابط هنا بسهولة.
 * - name: اسم الفئة (يجب أن يكون بالإنجليزية وبدون مسافات لاستخدامه في أسماء المجلدات والملفات).
 * - urls: مصفوفة تحتوي على روابط الصفحات الرئيسية للفئة.
 */
const CATEGORIES_CONFIG = [
  { name: "bags", urls: bagsURLs },
  // { name: "seaClothes", urls: seaClothesurls },
  // { name: "shoes", urls: shoesURLs },
  // { name: "wallets", urls: walletsURLs },
  // { name: "clothes", urls: clothesURLs },
  // { name: "cloves", urls: clovesURLs },
  // { name: "scarf", urls: scarfURLs },
  // { name: "strap", urls: strapURLs },
];

/**
 * @description إعدادات المتصفح.
 * - headless: لتشغيل المتصفح في الخلفية (true) أو إظهاره (false) لسهولة المتابعة والتجربة.
 * على الـ VPS، يجب أن تكون القيمة `true`.
 * - slowMo: لإضافة تأخير بسيط (بالمللي ثانية) بين العمليات لتجنب الحظر.
 */
const BROWSER_OPTIONS = {
  headless: true, // غيرها إلى true عند الرفع على الـ VPS
  slowMo: 50,
  args: ["--no-sandbox", "--disable-setuid-sandbox"], // إعدادات مهمة للتشغيل على بيئة Linux (VPS)
};

/**
 * @description رؤوس الأعمدة لملف الإكسل.
 * سيتم استخدام هذه القائمة لإنشاء الهيدر في كل ملف Excel.
 */
const EXCEL_HEADERS = [
  "title", // سيتم ملؤه
  "code", // سيتم ملؤه
  "price", // سيتم ملؤه
  "mainImage_url", // سيتم ملؤه
  "otherImages_urls", // سيتم ملؤه
  "other_details", // سيتم ملؤه
  "local_mainImage_path", // سيتم ملؤه
  "local_otherImages_paths", // سيتم ملؤه
  "Product En المنتج بالانجليزية",
  "Product Ar المنتج بالعربية *",
  "Product Type نوع المنتج *",
  "Category Ar التصنيف بالعربية *",
  "Category en التصنيف بالانجليزية",
  "Quantity الكمية *",
  "Weight الوزن *",
  "Subtitle En العنوان الفرعي بالانجليزية",
  "Subtitle Ar العنوان الفرعي بالعربية",
  "Promo Title En  العنوان الترويجي بالانجليزية  ",
  "Promo Title Ar العنوان الترويجي بالعربية",
  "Description En الوصف بالانجليزية",
  "Description Ar الوصف بالعربية",
  "Is Free shipping شحن مجاني",
  "Contains a battery يحتوي على بطارية ",
  "Is Pre order طلب مسبق ",
  "Guarantee Duration مدة الضمان (عدد الأيام) ",
  "Prepare Duration مدة التجهيز (عدد الأيام) *",
  "Is Restorable قابل للاسترجاع",
  "Restorable Duration مدة الاسترجاع (عدد الأيام)",
  "Discount Price سعر التخفيض",
  "Cost التكلفة",
  "SKU رقم المخزون",
];

class YupooScraper {
  constructor(config) {
    this.categories = config;
    this.browser = null;
    this.page = null;
    this.outputDir = path.join(__dirname, "output");
  }

  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  }

  async init() {
    this.log("🚀 Initializing Scraper...");
    await fs.mkdir(this.outputDir, { recursive: true });

    this.browser = await puppeteer.launch(BROWSER_OPTIONS);
    this.page = await this.browser.newPage();

    // منع تحميل الملفات غير الضرورية لتسريع العملية
    await this.page.setRequestInterception(true);
    this.page.on("request", (req) => {
      if (
        ["stylesheet", "font", "image", "media"].includes(req.resourceType())
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }

  async getAllProductLinksForCategory(category) {
    this.log(
      `\n================== Processing Category: ${category.name} ==================`
    );
    const allProductLinks = new Set();

    for (const categoryUrl of category.urls) {
      const pagesToScrape = new Set([categoryUrl]);
      const scrapedPages = new Set();

      while (pagesToScrape.size > 0) {
        const currentPageUrl = pagesToScrape.values().next().value;
        pagesToScrape.delete(currentPageUrl);

        if (
          !currentPageUrl ||
          !currentPageUrl.startsWith("http") ||
          scrapedPages.has(currentPageUrl)
        ) {
          continue;
        }

        this.log(`🕵️‍♂️ Visiting page to find links: ${currentPageUrl}`);
        await this.page.goto(currentPageUrl, { waitUntil: "networkidle2" });
        scrapedPages.add(currentPageUrl);

        const pageData = await this.page.evaluate(() => {
          const productLinks = Array.from(
            document.querySelectorAll(".album__main > a"),
            (a) => a.href
          );
          const paginationLinks = [];
          const paginationContainer = document.querySelector(
            ".none_select.pagination__buttons"
          );
          if (paginationContainer) {
            Array.from(paginationContainer.children).forEach((child) => {
              if (
                !child.classList.contains("pagination__active") &&
                child.classList.contains("pagination__number") &&
                child.href
              ) {
                paginationLinks.push(child.href);
              }
            });
          }
          return { productLinks, paginationLinks };
        });

        pageData.productLinks.forEach((link) => allProductLinks.add(link));
        pageData.paginationLinks.forEach((link) => pagesToScrape.add(link));
      }
    }
    return Array.from(allProductLinks);
  }

  async scrapeProductDetails(productUrl) {
    try {
      this.log(`   Scraping product: ${productUrl}`);
      await this.page.goto(productUrl, { waitUntil: "networkidle2" });
      return await this.page.evaluate(() => {
        const getElementText = (selector) =>
          document.querySelector(selector)?.innerText || "";
        const getElementAttr = (selector, attr) =>
          document.querySelector(selector)?.[attr] || null;

        const titleElement = document.querySelector(
          ".showalbumheader__gallerydec h2"
        );
        const rawTitle = titleElement ? titleElement.innerHTML : "";
        const fullTitle = rawTitle
          .replace(/<i.*?><\/i>/g, "|")
          .replace(/<\/?[^>]+(>|$)/g, "")
          .trim();
        const [title, code] = fullTitle.includes("|")
          ? fullTitle.split("|")
          : [fullTitle, "N/A"];

        const priceText = getElementText(".showalbumheader__gallerydec div");
        let price = "N/A",
          otherDetails = "N/A";
        if (priceText.includes("USD")) {
          const parts = priceText.split("USD");
          price = (parts[0] || "").split(":").pop().trim();
          otherDetails = (parts[1] || "").replace(/\n/g, " ").trim();
        }

        return {
          title,
          code,
          price,
          otherDetails,
          mainImageUrl: getElementAttr(
            ".showalbumheader__gallerycover img",
            "src"
          ),
          otherImageUrls: Array.from(
            document.querySelectorAll(
              ".showalbum__children .autocover.image__img.image__portrait"
            ),
            (img) => img.src
          ),
        };
      });
    } catch (error) {
      this.log(
        `❌ Error scraping product ${productUrl}. Skipping. Error: ${error.message}`
      );
      return null;
    }
  }

  async downloadImage(url, savePath, referer) {
    let imagePage = null;
    try {
      imagePage = await this.browser.newPage();
      await imagePage.setExtraHTTPHeaders({ Referer: referer });
      const response = await imagePage.goto(url, { waitUntil: "networkidle0" });
      if (response?.ok()) {
        await fs.writeFile(savePath, await response.buffer());
      }
    } catch (error) {
      this.log(`⚠️ Could not download image ${url}. Error: ${error.message}`);
    } finally {
      if (imagePage) await imagePage.close();
    }
  }

  saveToExcel(data, filePath) {
    if (data.length === 0) return;
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Products");
    xlsx.writeFile(workbook, filePath);
    this.log(`💾 Data saved to Excel file: ${filePath}`);
  }

  async run() {
    await this.init();
    try {
      for (const category of this.categories) {
        const productLinks = await this.getAllProductLinksForCategory(category);
        this.log(
          `Found a total of ${productLinks.length} unique products for category "${category.name}".`
        );
        if (productLinks.length === 0) continue;

        const categoryDir = path.join(this.outputDir, category.name);
        await fs.mkdir(categoryDir, { recursive: true });

        const allProductData = [];

        for (const url of productLinks) {
          const productDetails = await this.scrapeProductDetails(url);
          if (!productDetails) continue;

          const productId = url.match(/albums\/(\d+)/)?.[1] || Date.now();
          const productImagesDir = path.join(categoryDir, String(productId));
          await fs.mkdir(productImagesDir, { recursive: true });

          if (productDetails.mainImageUrl) {
            const savePath = path.join(productImagesDir, `main_image.jpg`);
            await this.downloadImage(
              productDetails.mainImageUrl,
              savePath,
              url
            );
            productDetails.local_mainImage_path = savePath;
          }

          productDetails.local_otherImages_paths = [];
          for (let i = 0; i < productDetails.otherImageUrls.length; i++) {
            const imgUrl = productDetails.otherImageUrls[i];
            const savePath = path.join(
              productImagesDir,
              `other_image_${i}.jpg`
            );
            await this.downloadImage(imgUrl, savePath, url);
            productDetails.local_otherImages_paths.push(savePath);
          }
          allProductData.push(productDetails);
        }

        const excelPath = path.join(this.outputDir, `${category.name}.xlsx`);
        this.saveToExcel(allProductData, excelPath);
      }
    } catch (error) {
      this.log(
        `🚨 A fatal error occurred during the run: ${error.message}\n${error.stack}`
      );
    } finally {
      this.log("✅ Scraper finished its job.");
      await this.browser.close();
    }
  }
}

// ===================================================================================
// نقطة بداية تشغيل السكربت
// ===================================================================================

const scraper = new YupooScraper(CATEGORIES_CONFIG);
scraper.run();

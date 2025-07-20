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
  { name: "seaClothes", urls: seaClothesurls },
  // { name: "bags", urls: bagsURLs },
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

// ===================================================================================
// END: منطقة الإعدادات والتخصيص
// ===================================================================================

// دالة مساعدة لطباعة الرسائل مع الوقت لسهولة التتبع
const log = (message) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

/**
 * @description تتأكد من وجود مجلد المخرجات الرئيسي، وتنشئه إذا لم يكن موجودًا.
 */
const setupOutputDirectory = async () => {
  const dir = path.join(__dirname, "output");
  try {
    await fs.access(dir);
  } catch (error) {
    log(`Creating output directory: ${dir}`);
    await fs.mkdir(dir, { recursive: true });
  }
  return dir;
};

/**
 * @description تجمع روابط جميع المنتجات من صفحة فئة معينة، مع التعامل مع الـ Pagination.
 * @param {object} page - كائن صفحة Puppeteer.
 * @param {string} categoryUrl - رابط صفحة الفئة.
 * @returns {Promise<string[]>} - مصفوفة تحتوي على روابط كل المنتجات في الفئة.
 */
const getAllProductLinks = async (page, categoryUrl) => {
  log(`Navigating to category page: ${categoryUrl}`);
  await page.goto(categoryUrl, { waitUntil: "networkidle2" });

  let allLinks = new Set();
  let pagesToVisit = [categoryUrl];
  let visitedPages = new Set();

  // التحقق من وجود Pagination وجمع روابط الصفحات الأخرى
  const paginationExists = await page.$("nav .pagination__main");
  if (paginationExists) {
    log("Pagination found. Collecting all page links...");
    const pageUrls = await page.evaluate(() => {
      const links = [];
      const buttons = document.querySelectorAll(
        ".none_select.pagination__buttons > a.pagination__number"
      );
      buttons.forEach((button) => {
        if (
          button.href &&
          !button.classList.contains("pagination__active") &&
          button.classList.contains("pagination__number")
        ) {
          links.push(button.href);
        }
      });
      return links;
    });
    pagesToVisit.push(...pageUrls);
  }

  // المرور على كل صفحة من صفحات الفئة لجمع روابط المنتجات
  for (const url of pagesToVisit) {
    if (visitedPages.has(url)) continue;
    visitedPages.add(url);

    if (url !== categoryUrl) {
      log(`Navigating to pagination page: ${url}`);
      await page.goto(url, { waitUntil: "networkidle2" });
    }

    const productLinksOnPage = await page.evaluate(() => {
      const links = [];
      document
        .querySelectorAll(".album__main > a")
        .forEach((a) => links.push(a.href));
      return links;
    });

    productLinksOnPage.forEach((link) => allLinks.add(link));
    log(`Found ${productLinksOnPage.length} products on this page.`);
  }

  return Array.from(allLinks);
};

/**
 * @description تقوم بتحميل صورة بفتحها في تاب جديدة ومحاكاة طلب المستخدم.
 * @param {object} browser - كائن متصفح Puppeteer الرئيسي.
 * @param {string} url - رابط الصورة.
 * @param {string} savePath - المسار الكامل لحفظ الصورة.
 * @param {string} referer - رابط الصفحة التي وجدت فيها الصورة (لإرساله كـ header).
 * @returns {Promise<void>}
 */
const downloadImage = async (browser, url, savePath, referer) => {
  let imagePage = null;
  try {
    imagePage = await browser.newPage();
    // ضبط الهيدرز لجعل الطلب يبدو طبيعياً
    await imagePage.setExtraHTTPHeaders({ Referer: referer });

    const response = await imagePage.goto(url, { waitUntil: "networkidle0" });

    if (response && response.ok()) {
      const imageBuffer = await response.buffer();
      await fs.writeFile(savePath, imageBuffer);
    } else {
      throw new Error(
        `Failed to download. Status: ${response ? response.status() : "N/A"}`
      );
    }
  } catch (error) {
    log(`⚠️ Could not download image ${url}. Error: ${error.message}`);
  } finally {
    if (imagePage) {
      await imagePage.close(); // تأكد من إغلاق التاب دائمًا
    }
  }
};
/**
 * @description تسحب بيانات منتج واحد من صفحته.
 * @param {object} browser - كائن متصفح Puppeteer.
 * @param {object} page - كائن صفحة Puppeteer.
 * @param {string} productUrl - رابط صفحة المنتج.
 * @param {string} categoryDir - مسار مجلد الفئة لحفظ الصور.
 * @returns {Promise<object|null>}
 */
const scrapeProductDetails = async (browser, page, productUrl, categoryDir) => {
  try {
    log(`Scraping product: ${productUrl}`);
    await page.goto(productUrl, { waitUntil: "networkidle2" });
    const data = await page.evaluate(() => {
      const titleElement = document.querySelector(
        ".showalbumheader__gallerydec h2"
      );
      const priceElement = document.querySelector(
        ".showalbumheader__gallerydec div"
      );
      const mainImageElement = document.querySelector(
        ".showalbumheader__gallerycover img"
      );
      const otherImageElements = document.querySelectorAll(
        ".showalbum__children .autocover.image__img.image__portrait"
      );
      const rawTitle = titleElement ? titleElement.innerHTML : "";
      const fullTitle = rawTitle
        .replace(/<i class="showalbumheader__separator"><\/i>/g, "|")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .trim();
      const [title, code] = fullTitle.includes("|")
        ? fullTitle.split("|")
        : [fullTitle, "N/A"];
      const priceText = priceElement ? priceElement.innerText : "";
      let price = "N/A",
        otherDetails = "N/A";
      if (priceText.includes("USD")) {
        const parts = priceText.split("USD");
        price = (parts[0] || "").split(":").pop().trim();
        otherDetails = (parts[1] || "").replace(/\n/g, " ").trim();
      }
      const mainImageUrl = mainImageElement ? mainImageElement.src : null;
      const otherImageUrls = Array.from(otherImageElements, (img) => img.src);
      return { title, code, price, otherDetails, mainImageUrl, otherImageUrls };
    });

    const productId =
      productUrl.match(/albums\/(\d+)/)?.[1] || `product_${Date.now()}`;
    const productImagesDir = path.join(categoryDir, productId);
    await fs.mkdir(productImagesDir, { recursive: true });

    let localMainImagePath = null;
    if (data.mainImageUrl) {
      const imageName =
        path.basename(new URL(data.mainImageUrl).pathname) || "main.jpg";
      localMainImagePath = path.join(productImagesDir, `main_${imageName}`);
      // استدعاء دالة التحميل الجديدة
      await downloadImage(
        browser,
        data.mainImageUrl,
        localMainImagePath,
        productUrl
      );
    }

    const localOtherImagePaths = [];
    for (let i = 0; i < data.otherImageUrls.length; i++) {
      const imgUrl = data.otherImageUrls[i];
      const imageName =
        path.basename(new URL(imgUrl).pathname) || `other_${i}.jpg`;
      const localPath = path.join(productImagesDir, `other_${i}_${imageName}`);
      // استدعاء دالة التحميل الجديدة
      await downloadImage(browser, imgUrl, localPath, productUrl);
      localOtherImagePaths.push(localPath);
    }

    return {
      title: data.title,
      code: data.code,
      price: data.price,
      mainImage_url: data.mainImageUrl || "N/A",
      otherImages_urls: data.otherImageUrls.join(" @ "),
      other_details: data.otherDetails,
      local_mainImage_path: localMainImagePath,
      local_otherImages_paths: localOtherImagePaths.join(" @ "),
    };
  } catch (error) {
    log(
      `❌ Error scraping product ${productUrl}. Skipping. Error: ${error.message}`
    );
    return null;
  }
};

/**
 * @description تحفظ البيانات المسحوبة في ملف Excel.
 * @param {Array<object>} data - مصفوفة بيانات المنتجات.
 * @param {string} filePath - المسار لحفظ ملف الإكسل.
 */
const saveToExcel = (data, filePath) => {
  if (data.length === 0) {
    log(`No data to save for ${filePath}.`);
    return;
  }
  const worksheet = xlsx.utils.json_to_sheet(data, { header: EXCEL_HEADERS });
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "Products");
  xlsx.writeFile(workbook, filePath);
  log(`💾 Data saved to Excel file: ${filePath}`);
};

/**
 * @description تضغط مجلد وملف الإكسل الخاص بالفئة.
 * @param {string} sourceDir - المجلد المراد ضغطه.
 * @param {string} excelPath - ملف الإكسل المراد إضافته للضغط.
 * @param {string} outPath - مسار الملف المضغوط الناتج.
 * @returns {Promise<void>}
 */
const zipCategoryOutput = (sourceDir, excelPath, outPath) => {
  return new Promise((resolve, reject) => {
    const output = require("fs").createWriteStream(outPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      log(
        `📦 Category archive created: ${outPath} (${(
          archive.pointer() /
          1024 /
          1024
        ).toFixed(2)} MB)`
      );
      resolve();
    });

    archive.on("error", (err) => reject(err));
    archive.pipe(output);
    archive.directory(sourceDir, path.basename(sourceDir)); // إضافة مجلد الصور
    archive.file(excelPath, { name: path.basename(excelPath) }); // إضافة ملف الإكسل
    archive.finalize();
  });
};

// ===================================================================================
// START: الدوال الرئيسية للتشغيل
// ===================================================================================

/**
 * @description الدالة الرئيسية التي تدير عملية الـ Scraping بأكملها.
 */
async function main() {
  log("🚀 Scraper starting...");
  const outputDir = await setupOutputDirectory();
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();
  const categoryArchives = [];

  try {
    for (const category of CATEGORIES_CONFIG) {
      log(
        `\n================== Processing Category: ${category.name} ==================`
      );
      const categoryDir = path.join(outputDir, category.name);
      await fs.mkdir(categoryDir, { recursive: true });

      let allProductLinks = [];
      for (const url of category.urls) {
        try {
          const links = await getAllProductLinks(page, url);
          allProductLinks.push(...links);
        } catch (error) {
          log(
            `❌ Failed to process category URL ${url}. Error: ${error.message}`
          );
        }
      }
      // إزالة الروابط المكررة
      allProductLinks = [...new Set(allProductLinks)];
      log(
        `Found a total of ${allProductLinks.length} unique products for category "${category.name}".`
      );

      const productData = [];
      for (const productUrl of allProductLinks) {
        const data = await scrapeProductDetails(page, productUrl, categoryDir);
        if (data) productData.push(data); // فقط أضف البيانات إذا لم تكن null
      }

      const excelPath = path.join(outputDir, `${category.name}.xlsx`);
      saveToExcel(productData, excelPath);

      // ضغط مخرجات الفئة
      const zipPath = path.join(outputDir, `${category.name}.zip`);
      await zipCategoryOutput(categoryDir, excelPath, zipPath);
      categoryArchives.push(zipPath);

      // حذف المجلد الأصلي وملف الإكسل بعد الضغط (اختياري)
      await fs.rm(categoryDir, { recursive: true, force: true });
      await fs.rm(excelPath, { force: true });
      log(`Cleaned up original files for category: ${category.name}`);
    }

    // ضغط كل ملفات zip الخاصة بالفئات في ملف واحد نهائي
    if (categoryArchives.length > 0) {
      log("\n================== Creating Final Archive ==================");
      const finalZipPath = path.join(outputDir, "final_all_products.zip");
      await new Promise((resolve, reject) => {
        const output = require("fs").createWriteStream(finalZipPath);
        const archive = archiver("zip", { zlib: { level: 9 } });
        output.on("close", resolve);
        archive.on("error", reject);
        archive.pipe(output);
        categoryArchives.forEach((zipFile) => {
          archive.file(zipFile, { name: path.basename(zipFile) });
        });
        archive.finalize();
      });
      log(`🎉🎉🎉 Final archive created at: ${finalZipPath}`);
    }
  } catch (error) {
    log(`🚨 A fatal error occurred: ${error.message}\n${error.stack}`);
  } finally {
    await browser.close();
    log("✅ Scraper finished its job and browser is closed.");
  }
}

/**
 * @description دالة تجريبية لتشغيل الكود على رابط منتج واحد فقط وإظهار المتصفح.
 * مفيدة جداً لعملية الـ Debugging والتأكد من أن الـ Selectors تعمل بشكل صحيح.
 * قم بإلغاء التعليق من السطر الأخير لتشغيلها بدلاً من الدالة الرئيسية.
 */

async function testSingleProduct(productUrl) {
  log("🚀 Starting single product test...");
  if (!productUrl) {
    log("❌ Test URL is not provided. Please define 'testUrl'.");
    return;
  }
  const browser = await puppeteer.launch(BROWSER_OPTIONS);
  const page = await browser.newPage();
  const outputDir = await setupOutputDirectory();
  const testCategoryDir = path.join(outputDir, "test_product_images");

  // استدعاء الدالة بالترتيب الصحيح للمعاملات
  const data = await scrapeProductDetails(
    browser,
    page,
    productUrl,
    testCategoryDir
  );

  if (data) {
    console.log("\n✅ Test Result - Scraped Data:");
    console.log(JSON.stringify(data, null, 2));
  } else {
    console.log("\n❌ Test failed. Could not scrape data.");
  }
  await browser.close();
  log("✅ Test finished.");
}

// ===================================================================================
// START: نقطة بداية تشغيل السكربت
// ===================================================================================

// لتشغيل عملية السحب الكاملة
main();

// // لإلغاء التعليق عن السطر التالي وتجربة رابط واحد فقط (مع وضع تعليق على main();)
// const testUrl =
//   "https://newcopybrand.x.yupoo.com/albums/202890516?uid=1&isSubCate=true&referrercate=196763"; // ضع رابط منتج هنا
// testSingleProduct(testUrl);

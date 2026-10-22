/* أدوات الأسعار — بتتستخدم في الهوم وصفحة الخدمات وصفحة الخدمة */

export const minPrice = (service) =>
  Math.min(...service.packages.map((pkg) => pkg.price));

export const dayRange = (service) => {
  const days = service.packages.map((pkg) => pkg.days);
  return `${Math.min(...days)}–${Math.max(...days)} days`;
};

export const formatMoney = (value, currency) =>
  `${new Intl.NumberFormat("en-US").format(value)} ${currency.label}`;

/* الإضافة داخلة أصلًا في الباقة المختارة؟ */
export const isIncluded = (addon, pkgId) => Boolean(addon.includedIn?.includes(pkgId));

/* الإجمالي = سعر الباقة + الإضافات المختارة اللي مش داخلة فيها */
export const calcTotal = (service, pkgId, addonIds) => {
  const pkg = service.packages.find((item) => item.id === pkgId);

  const extras = service.addons
    .filter((addon) => addonIds.includes(addon.id) && !isIncluded(addon, pkgId))
    .reduce((sum, addon) => sum + addon.price, 0);

  return (pkg?.price ?? 0) + extras;
};
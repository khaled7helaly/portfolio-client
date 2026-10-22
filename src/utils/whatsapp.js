/* بيبني رسالة الواتس من القالب اللي في orderServices.json */

const fill = (template, values) =>
  template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");

export function buildOrder({ whatsapp, siteUrl }, { service, pkg, addons, total, form }) {
  const text = fill(whatsapp.template, {
    service: service.title,
    package: pkg.name,
    days: pkg.days,
    addons: addons.length ? addons.map((addon) => addon.name).join("، ") : whatsapp.noAddons,
    total: new Intl.NumberFormat("en-US").format(total),
    name: form.name.trim(),
    contact: form.contact.trim(),
    description: form.description.trim(),
    deadline: form.deadline.trim() || "مفتوح",
    link: `${siteUrl}/services/${service.slug}`,
  });

  return {
    text,
    link: `https://wa.me/201276539981?text=${encodeURIComponent(text)}`,
  };
}
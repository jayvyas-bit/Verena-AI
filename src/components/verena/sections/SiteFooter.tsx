import verenaLogo from "../../../assets/homepage/image-15.webp";
import { bricolage, FOOTER_LINK_GROUPS, INK, SOCIAL_LINKS } from "../verenaHomepage.data";
import { FooterIcon } from "../verenaHomepage.icons";

export function SiteFooter() {
  return (
    <footer
      className="section-pad-x relative overflow-hidden pt-12 sm:pt-[clamp(5rem,4rem+2.5vw,7rem)]"
      style={{ backgroundColor: INK, color: "rgba(250, 249, 246, 0.7)" }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <img
              src={verenaLogo}
              alt="Verena"
              width={843}
              height={182}
              loading="lazy"
              className="h-9 w-auto object-contain brightness-0 invert sm:h-7"
            />
            <p className="mt-3 max-w-[280px] text-sm leading-[21px]">A product of Invictus AI.</p>
            <p className="mt-3 text-xs leading-[18px]" style={{ color: "rgba(250, 249, 246, 0.6)" }}>
              548 Market St, Suite 200
              <br />
              San Francisco, CA 94104
            </p>

            <div className="mt-4 flex items-center gap-2.5 sm:mt-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.icon}
                  href="#"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full transition duration-200 ease-out hover:-translate-y-0.5 hover:bg-[rgba(250,249,246,0.14)] hover:text-white active:translate-y-0 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37]"
                  style={{ backgroundColor: "rgba(250, 249, 246, 0.07)" }}
                >
                  <FooterIcon name={social.icon} size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:contents">
            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.title}>
                <p
                  style={{ ...bricolage, color: "rgba(250, 249, 246, 0.6)" }}
                  className="text-xs font-semibold uppercase tracking-[0.1em]"
                >
                  {group.title}
                </p>
                <ul className="mt-1.5 flex flex-col text-sm">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="inline-block rounded-sm py-2 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#210c37] sm:py-2.5"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 flex flex-col gap-3 border-t pt-5 text-xs sm:mt-10 sm:flex-row sm:items-center sm:justify-between sm:pt-6"
          style={{
            borderColor: "rgba(250, 249, 246, 0.12)",
            color: "rgba(250, 249, 246, 0.6)",
          }}
        >
          <p>© {new Date().getFullYear()} Invictus AI. All rights reserved.</p>
          <p>Verena is in beta. Check important results before you act on them.</p>
        </div>
      </div>

      {/* Bleeding brand wordmark */}
      <div className="relative mt-8 h-[90px] select-none overflow-hidden sm:h-[150px] lg:h-[190px]" aria-hidden>
        <p
          className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap font-semibold leading-none tracking-tight"
          style={{
            ...bricolage,
            fontSize: "clamp(6rem, 20vw, 16rem)",
            color: "transparent",
            WebkitTextStroke: "1px rgba(250, 249, 246, 0.14)",
          }}
        >
          Verena
        </p>
      </div>
    </footer>
  );
}

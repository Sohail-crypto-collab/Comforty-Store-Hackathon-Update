import { MdOutlineFacebook } from "react-icons/md";
import { RiTwitterFill } from "react-icons/ri";
import { LiaInstagram } from "react-icons/lia";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoYoutube } from "react-icons/bi";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

const Footer = async () => {
  const categories = await client.fetch(`
    *[_type == "categories"] {
      title,
      "imageUrl": image.asset->url, 
      products
    }
  `);

  return (
    <div className="w-full py-8 ">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 xl:px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6">
          {/* Left Card */}
          <div className="bg-teal-500 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-10">
              Do not leave just yet,
              <br />
              explore these resources!
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Company Column */}
              <div className="">
                <h3 className="font-semibold lg:text-lg xl:text-xl mb-4">
                  Company
                </h3>
                <ul className="space-y-2 text-sm xl:text-md">
                  <li>
                    <Link href="/" className="hover:underline">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Culture
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Product Column */}
              <div className="xl:-ml-14 lg:-ml-10 md:-ml-10">
                <h3 className="font-semibold lg:text-lg xl:text-xl mb-4">
                  Product
                </h3>
                <ul className="space-y-2 text-sm xl:text-md">
                  <li>
                    <Link href="/" className="hover:underline">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Case studies
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link href="/" className="hover:underline">
                      Updates
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Newsletter Column (3rd column) - Full width on mobile */}
              <div className="col-span-2 md:col-auto xl:-ml-20 lg:-ml-14 md:-ml-14">
                <h3 className="font-semibold lg:text-lg xl:text-xl mb-4">
                  Subscribe to our newsletter
                </h3>
                <p className="text-sm mb-4 xl:text-md">
                  Be the first to receive exciting news, insider tips, and
                  special promotions.
                </p>
                <div className="flex rounded-full overflow-hidden bg-white">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-2 text-gray-800 text-sm outline-none w-full"
                  />
                  <button className="bg-teal-700 text-white px-4 py-2 text-sm font-medium rounded-r-full">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Support */}
          <div className="bg-teal-500 text-white p-8 rounded-lg flex flex-col">
            <h2 className="text-2xl font-bold mb-6 xl:text-3xl">Support</h2>
            <p className="mb-2 text-sm xl:text-md">
              Have a questions?{" "}
              <Link href="/" className="underline font-medium">
                Get in touch
              </Link>{" "}
              or check out our{" "}
              <Link href="/" className="underline font-medium">
                Help Center
              </Link>
              .
            </p>
            <p className="mb-8 text-sm xl:text-md">
              You can also text our support team at
              <br />
              <span className="underline font-medium">(61) 756-4686</span> or
              email us at
              <br />
              <Link
                href="mailto:help@aditama.com"
                className="underline font-medium"
              >
                help@aditama.com
              </Link>
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-auto">
              <Link href="/" aria-label="Facebook" className="hover:opacity-80">
                <MdOutlineFacebook className="size-5" />
              </Link>
              <Link href="/" aria-label="Twitter" className="hover:opacity-80">
                <RiTwitterFill className="size-5" />
              </Link>
              <Link
                href="/"
                aria-label="Instagram"
                className="hover:opacity-80"
              >
                <LiaInstagram className="size-5" />
              </Link>
              <Link href="/" aria-label="LinkedIn" className="hover:opacity-80">
                <FaLinkedinIn className="size-5" />
              </Link>
              <Link href="/" aria-label="YouTube" className="hover:opacity-80">
                <BiLogoYoutube className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import heroCoverImg from "@/assets/images/clinic-cover.jpg";
import skinTextureImg from "@/assets/images/skin-texture.png";
import serumAppImg from "@/assets/images/serum-application.png";
import sideProfileImg from "@/assets/images/side-profile.png";
import productBottleImg from "@/assets/images/product-bottle.png";
import treatmentImg from "@/assets/images/treatment.png";
import skinElementsLogo from "@/assets/images/skin-elements-logo.png";
import clinicInterior1 from "@/assets/images/clinic-interior-1.jpg";
import clinicInterior2 from "@/assets/images/clinic-interior-2.jpg";

const WHATSAPP_URL = "https://wa.me/917507649901?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment%20at%20The%20Skin%20Elements";

function Counter({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(from);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView.current) {
          inView.current = true;
          animate(from, to, {
            duration,
            onUpdate: (value) => setCount(Math.round(value)),
            ease: "easeOut",
          });
        }
      },
      { threshold: 0.5 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}

function RevealImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="flex flex-col min-h-screen selection:bg-terracotta selection:text-terracotta-foreground bg-background">
      
      {/* Top Nav */}
      <nav className="flex items-center justify-between p-6 md:px-12 border-b border-border/40">
        <div className="font-serif text-2xl tracking-wide text-foreground">
          The Skin<span className="text-terracotta italic ml-1">Elements</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
          <a href="#services" className="hover:text-terracotta transition-colors">Treatments</a>
          <a href="#about" className="hover:text-terracotta transition-colors">Why Us</a>
          <a href="#testimonials" className="hover:text-terracotta transition-colors">Stories</a>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <Button className="rounded-full bg-foreground text-background hover:bg-terracotta hover:text-terracotta-foreground transition-all duration-300 rounded-none px-6">
            BOOK APPOINTMENT
          </Button>
        </a>
      </nav>

      {/* Editorial Hero Grid */}
      <section className="grid grid-cols-1 md:grid-cols-12 min-h-[90vh]">
        {/* Main Title Block */}
        <div className="md:col-span-7 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-muted/30">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-block bg-mustard text-mustard-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-8">
              Skin · Hair · Laser · Wellness
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-light leading-[0.9] tracking-tight text-foreground mb-8">
              Reveal your most <br/>
              <span className="font-serif italic text-terracotta">radiant</span> skin.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-md mb-12">
              Dr. Vaishnavi's expert skin, hair, laser and wellness care in Bibwewadi, Pune.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="rounded-full bg-terracotta text-terracotta-foreground hover:bg-terracotta/90 h-14 px-8 text-sm uppercase tracking-widest group rounded-none">
                  Book on WhatsApp
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Tiles */}
        <div className="md:col-span-5 grid grid-rows-2">
          <RevealImage 
            src={heroCoverImg} 
            alt="Dr. Vaishnavi consulting a patient at The Skin Elements" 
            className="h-[50vh] md:h-auto object-cover"
          />
          <div className="grid grid-cols-2">
            <div className="bg-terracotta text-terracotta-foreground p-8 flex flex-col justify-between">
              <div className="font-serif italic text-2xl">Purest form of care.</div>
              <div className="w-8 h-[1px] bg-terracotta-foreground/50 mt-4 mb-4"></div>
              <div className="text-sm font-light opacity-90">Tailored to your unique skin story.</div>
            </div>
            <RevealImage 
              src={skinTextureImg} 
              alt="Dewy skin texture" 
              className="h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust Stats Ticker */}
      <section className="border-y border-border/40 bg-background py-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border/40 text-center">
          <div className="flex-1 w-full pt-4 md:pt-0">
            <div className="text-4xl font-serif text-terracotta mb-1">5.0</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Rating</div>
          </div>
          <div className="flex-1 w-full pt-4 md:pt-0">
            <div className="text-4xl font-serif text-foreground mb-1"><Counter from={0} to={47} />+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Happy Patients</div>
          </div>
          <div className="flex-1 w-full pt-4 md:pt-0">
            <div className="text-4xl font-serif text-foreground mb-1"><Counter from={0} to={10} />+</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Treatments</div>
          </div>
          <div className="flex-1 w-full pt-4 md:pt-0 flex flex-col items-center">
            <Clock className="w-8 h-8 text-muted-foreground mb-2" strokeWidth={1} />
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Open till 9:00 PM</div>
          </div>
        </div>
      </section>

      {/* Services Grid (Editorial layout) */}
      <section id="services" className="py-24 bg-muted/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="inline-block bg-mustard text-mustard-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-6">
                Treatments
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-foreground">
                Advanced <span className="font-serif italic text-terracotta">Solutions</span>
              </h2>
            </div>
            <div className="max-w-sm text-muted-foreground font-light text-sm">
              A curated selection of premium skin, hair and laser treatments — every protocol personally designed by Dr. Vaishnavi.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-1">
            <RevealImage
              src={clinicInterior1}
              alt="The Skin Elements clinic reception"
              className="aspect-[16/10] w-full"
            />
            <RevealImage
              src={clinicInterior2}
              alt="Treatment room at The Skin Elements"
              className="aspect-[16/10] w-full"
            />
          </div>

          <div className="grid md:grid-cols-12 gap-1">
            <div className="md:col-span-4 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group">
              <h3 className="text-2xl font-serif mb-4 group-hover:text-terracotta transition-colors">Acne Treatment</h3>
              <p className="text-muted-foreground text-sm font-light">Clear active acne and prevent scars with dermat-led, customised protocols.</p>
            </div>
            <div className="md:col-span-8 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group relative overflow-hidden">
              <RevealImage src={treatmentImg} alt="Treatment" className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
              <h3 className="text-2xl font-serif mb-4 relative z-10 group-hover:text-terracotta transition-colors">Laser Therapy</h3>
              <p className="text-muted-foreground text-sm font-light max-w-md relative z-10">Advanced laser solutions for hair removal, scars, pigmentation and skin rejuvenation.</p>
            </div>
            
            <div className="md:col-span-6 bg-terracotta text-terracotta-foreground p-10 border border-terracotta/20">
              <h3 className="text-2xl font-serif mb-4">Skin Brightening</h3>
              <p className="text-terracotta-foreground/80 text-sm font-light">Achieve a luminous, even-toned complexion with targeted brightening therapy.</p>
            </div>
            <div className="md:col-span-6 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group">
              <h3 className="text-2xl font-serif mb-4 group-hover:text-terracotta transition-colors">Hair Transplant</h3>
              <p className="text-muted-foreground text-sm font-light">Restore natural, lasting hair growth with safe, advanced transplant techniques.</p>
            </div>
            
            <div className="md:col-span-7 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group">
              <h3 className="text-2xl font-serif mb-4 group-hover:text-terracotta transition-colors">Anti-aging</h3>
              <p className="text-muted-foreground text-sm font-light">Soften fine lines and restore youthful firmness with non-invasive therapies.</p>
            </div>
            <div className="md:col-span-5 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group">
              <h3 className="text-2xl font-serif mb-4 group-hover:text-terracotta transition-colors">Face PRP</h3>
              <p className="text-muted-foreground text-sm font-light">Boost natural collagen and glow using your own platelet-rich plasma.</p>
            </div>

            <div className="md:col-span-5 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group">
              <h3 className="text-2xl font-serif mb-4 group-hover:text-terracotta transition-colors">Microneedling</h3>
              <p className="text-muted-foreground text-sm font-light">Stimulate collagen for smoother texture, finer pores and tighter skin.</p>
            </div>
            <div className="md:col-span-7 bg-background p-10 border border-border/40 hover:border-terracotta transition-colors group">
              <h3 className="text-2xl font-serif mb-4 group-hover:text-terracotta transition-colors">Pigmentation</h3>
              <p className="text-muted-foreground text-sm font-light">Targeted treatment for melasma, dark spots and post-acne marks — safe for Indian skin.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Mixed Media Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 relative">
              <RevealImage src={sideProfileImg} alt="Side profile" className="w-4/5 aspect-[3/4]" />
              <div className="absolute -bottom-10 -right-4 w-2/3 aspect-square border-8 border-background">
                <RevealImage src={productBottleImg} alt="Serum bottle" className="w-full h-full" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block bg-mustard text-mustard-foreground text-[10px] font-bold px-3 py-1 uppercase tracking-widest mb-8">
                Why Us
              </div>
              <h2 className="text-4xl md:text-5xl font-serif italic text-terracotta mb-10 leading-tight">
                "At The Skin Elements, we believe every skin has a story."
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-8 h-[1px] bg-terracotta mt-3 shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 uppercase tracking-wider text-sm">Expert Care</h3>
                    <p className="text-muted-foreground font-light">Led by Dr. Vaishnavi — an experienced dermatologist who listens before she treats.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-[1px] bg-terracotta mt-3 shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 uppercase tracking-wider text-sm">Peaceful Environment</h3>
                    <p className="text-muted-foreground font-light">A calm, private clinic on Pune-Satara Road that feels like a retreat, not a queue.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-[1px] bg-terracotta mt-3 shrink-0"></div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 uppercase tracking-wider text-sm">Personalized Plans</h3>
                    <p className="text-muted-foreground font-light">No generic routines. Every treatment is tailored to your unique skin and hair goals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 bg-muted/40">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light">
              Patient <span className="font-serif italic text-terracotta">Stories</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              "My acne is finally under control after years of trying everything — thank you Dr. Vaishnavi",
              "Genuine results and a calm, professional environment. Truly the best clinic in Bibwewadi",
              "Visible improvement within the timeline they promised. Thank you for taking such good care of my skin"
            ].map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-10 border border-border/40"
              >
                <p className="text-foreground/90 font-serif text-xl italic leading-relaxed mb-8">"{quote}"</p>
                <div className="w-12 h-[1px] bg-terracotta"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Contact & Big CTA */}
      <section className="bg-foreground text-background">
        <div className="grid md:grid-cols-2">
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-5xl md:text-7xl font-light mb-8 leading-tight">
              Ready to start your <br/>
              <span className="font-serif italic text-terracotta">skin journey?</span>
            </h2>
            
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button size="lg" className="rounded-full bg-terracotta text-terracotta-foreground hover:bg-terracotta/90 h-16 px-10 text-sm uppercase tracking-widest group rounded-none">
                Message us on WhatsApp
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </a>
          </div>

          <div className="bg-muted text-foreground p-12 md:p-24 border-l border-border/20 flex flex-col justify-between">
            <h3 className="text-3xl font-serif mb-12">Visit the Clinic</h3>
            
            <div className="space-y-8 text-sm uppercase tracking-widest font-semibold">
              <div>
                <div className="text-muted-foreground mb-2 text-xs">Address</div>
                <div className="font-light normal-case tracking-normal text-base">
                  Office No 17B, Mudra Commercial Complex,<br />
                  Pune-Satara Rd, Bibwewadi,<br />
                  Pune 411037
                </div>
              </div>
              
              <div>
                <div className="text-muted-foreground mb-2 text-xs">Contact</div>
                <div className="font-light normal-case tracking-normal text-base">
                  <a href="tel:+917447221616" className="hover:text-terracotta transition-colors">074472 21616</a>
                  <span className="text-muted-foreground"> · </span>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta transition-colors">WhatsApp</a>
                </div>
              </div>

              <div>
                <div className="text-muted-foreground mb-2 text-xs">Timings</div>
                <div className="font-light normal-case tracking-normal text-base">Mon–Sun, open till 9:00 PM</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="h-[40vh] w-full bg-muted">
          <iframe 
            src="https://www.google.com/maps?q=Office+No+17B,+Mudra+Commercial+Complex,+Pune-Satara+Rd,+Bibwewadi,+Pune+411037&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[50%] contrast-[90%] opacity-90 mix-blend-multiply"
          ></iframe>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border/40 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-6">
            <img src={skinElementsLogo} alt="The Skin Elements — Dr. Vaishnavi's Clinic" className="h-32 w-auto" />
          </div>
          <p className="text-muted-foreground text-sm font-light mb-8 max-w-sm mx-auto">
            Dr. Vaishnavi's Skin, Hair, Laser & Wellness Clinic — Bibwewadi, Pune.
          </p>
          
          <div className="flex justify-center mb-12">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center border border-border/40 hover:border-terracotta hover:text-terracotta transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
          </div>
          
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground opacity-60">
            &copy; {new Date().getFullYear()} The Skin Elements — Dr. Vaishnavi's Clinic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

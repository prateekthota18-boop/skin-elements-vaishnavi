import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Star, Sparkles, Clock, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

const WHATSAPP_URL = "https://wa.me/919396428321?text=Hi%2C%20I'd%20like%20to%20book%20an%20appointment%20at%20Happy%20Life%20Clinic";

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

function BokehParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-muted mix-blend-overlay blur-xl"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/20">
      {/* Sticky Nav */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-wide text-foreground">
            Happy Life<span className="text-primary italic">Clinic</span>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Book Appointment
            </Button>
          </a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-muted via-background to-background">
        <BokehParticles />
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-3xl"
          >
            <span className="text-sm uppercase tracking-widest text-primary mb-6 block">Premium Skin Clinic in Hyderabad</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-6 leading-tight">
              Reveal Your Most <br/>
              <span className="italic text-primary/80">Radiant</span> Skin
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 font-light max-w-xl mx-auto">
              Expert dermatology and cosmetic care in the heart of Hyderabad. A peaceful space where your skin's story is heard and honored.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg relative overflow-hidden group">
                  <span className="relative z-10">Book on WhatsApp</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </Button>
              </a>
              <a href="tel:09396428321" className="w-full sm:w-auto">
                <Button variant="ghost" size="lg" className="w-full rounded-full h-14 px-8 text-lg font-normal">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 093964 28321
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ opacity }}
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />
        </motion.div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-primary/10 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary/10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex gap-1 text-primary mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <div className="text-3xl font-serif mb-1">5.0</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Rating</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-serif mb-2 text-primary">
                <Counter from={0} to={47} />+
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Happy Patients</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-3xl font-serif mb-2 text-primary">
                <Counter from={0} to={10} />+
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Treatments</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-primary mb-2" strokeWidth={1.5} />
              <div className="text-lg font-serif mb-1 text-foreground">Till 10:30 PM</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">Mon - Sun</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Curated Treatments</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Deep Peelings", desc: "Reveal fresh, glowing skin with customized chemical peels." },
              { title: "Anti-aging Solutions", desc: "Restore youthfulness with advanced, non-invasive therapies." },
              { title: "Pigmentation Treatment", desc: "Even out skin tone and clear stubborn dark spots safely." },
              { title: "CoolSculpting", desc: "Sculpt your body by safely freezing away unwanted fat." },
              { title: "Microneedling", desc: "Stimulate collagen for smoother, firmer, and tighter skin." },
              { title: "Skin Brightening", desc: "Achieve a luminous, flawless complexion with targeted care." }
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="group h-full border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500 bg-card rounded-2xl overflow-hidden cursor-pointer">
                  <CardContent className="p-8">
                    <Sparkles className="w-6 h-6 text-primary mb-6 opacity-70 group-hover:opacity-100 transition-opacity" strokeWidth={1} />
                    <h3 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Why Us */}
      <section className="py-24 bg-muted/40 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-serif italic text-primary/80 mb-12"
            >
              "At Happy Life, we believe every skin has a story."
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-12 text-left">
              {[
                { title: "Expert Care", desc: "Led by an experienced female dermatologist who listens." },
                { title: "Peaceful Environment", desc: "A softly lit, warm space that feels like a retreat, not a clinic." },
                { title: "Personalized Plans", desc: "No generic routines. Every treatment is tailored to your unique skin." }
              ].map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  <div className="w-8 h-[1px] bg-primary mb-6"></div>
                  <h3 className="text-lg font-medium mb-2">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Patient Stories</h2>
            <div className="w-12 h-[1px] bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Complete scar is gone from my face — I suffered a lot, thank you madam",
              "Really good results and peaceful environment, very professional",
              "Nice timeline results, thank you for taking care of my skin"
            ].map((quote, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm bg-muted/20 rounded-2xl p-8">
                  <div className="flex gap-1 mb-6 text-primary">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-foreground/80 font-serif text-lg italic leading-relaxed">"{quote}"</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-secondary/40 via-muted to-background">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-serif mb-8 text-foreground">Ready to start your skin journey?</h2>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-10 text-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Message us on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Contact & Map */}
      <section className="py-24 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif mb-8">Visit the Clinic</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      2nd floor, Legend Corporation,<br />
                      Barkatpura Main Rd, Kachiguda,<br />
                      Hyderabad 500027
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">Contact</h4>
                    <p className="text-muted-foreground font-light">093964 28321</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">Timings</h4>
                    <p className="text-muted-foreground font-light">Mon–Sun, open till 10:30 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-lg"
            >
              <iframe 
                src="https://www.google.com/maps?q=2nd+floor,+Legend+Corporation,+Barkatpura+Main+Rd,+Kachiguda,+Hyderabad+500027&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[90%] opacity-90 mix-blend-multiply"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border/50 text-center">
        <div className="container mx-auto px-4">
          <div className="font-serif text-2xl tracking-wide mb-2">
            Happy Life<span className="text-primary italic">Clinic</span>
          </div>
          <p className="text-muted-foreground text-sm font-light mb-8">Expert dermatology and cosmetic care in the heart of Hyderabad.</p>
          
          <div className="flex justify-center items-center gap-6 mb-8">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
          </div>
          
          <div className="text-xs text-muted-foreground opacity-60">
            &copy; {new Date().getFullYear()} Happy Life Dermatologists Cosmetic Clinic. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

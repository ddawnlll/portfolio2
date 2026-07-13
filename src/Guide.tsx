import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Code2, Database, Github, Layers3, Moon, Sparkles, Sun } from 'lucide-react'
import githubData from './data/github.json'

function useGuideTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('yusuf-theme') === 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('yusuf-theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, setDark] as const
}

const steps = [
  { icon: Database, title: '1. Gerçek veri toplandı', body: 'GitHub GraphQL API üzerinden 2026 katkı takvimi, commit sayısı ve commit katkısı bulunan repolar çekildi. Proje kartları için yalnızca repo metadata ve README içeriği kullanıldı; sayı veya etki uydurulmadı.' },
  { icon: Layers3, title: '2. Görsel dil kuruldu', body: 'Cream/blush zemin; rose, peach ve sıcak erik vurgular; Fraunces ile Nunito Sans eşleşmesi seçildi. Arka plan tek renk değil: ışık, nokta dokusu, kâğıt grenı ve vignette katmanlarından oluşuyor.' },
  { icon: Sparkles, title: '3. Hareket anlam kazandı', body: 'Hero’daki organik 3B form Three.js ile gerçek zamanlı çiziliyor. Her bölümde tek bir sinematik giriş, kartlarda konuma duyarlı ışık ve katkı grafiğinde odak/hover geri bildirimi var. Reduced-motion tercihi bütünüyle destekleniyor.' },
  { icon: Code2, title: '4. İki gerçek rota üretildi', body: 'Vite çoklu sayfa yapısı ana portfolyoyu ve bu /rehber rotasını ayrı HTML girişleri olarak derliyor. Böylece GitHub Pages’te rehber doğrudan açılabiliyor; 404 fallback de ana deneyimi koruyor.' },
  { icon: Github, title: '5. Yeniden üretilebilir veri', body: 'Tek komut GitHub GraphQL verisini yeniden çekip aynı şemada kaydediyor. Her yayın öncesinde TypeScript, production build ve görsel kalıp denetimleri çalıştırılıyor; ekranda snapshot tarihi açıkça gösteriliyor.' },
]

export default function Guide() {
  const [dark, setDark] = useGuideTheme()
  return (
    <div className="site-shell guide-page">
      <div className="atmosphere" aria-hidden="true"><i /><i /><i /></div>
      <header className="site-header">
        <a className="wordmark" href={import.meta.env.BASE_URL}><span>Y</span> Yusuf Karaca</a>
        <button className="theme-icon icon-button" onClick={() => setDark(!dark)} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}>{dark ? <Sun /> : <Moon />}</button>
      </header>
      <main>
        <section className="guide-hero">
          <a className="back-link" href={import.meta.env.BASE_URL}><ArrowLeft size={16} /> Portfolyoya dön</a>
          <p className="eyebrow">Türkçe yapım rehberi</p>
          <h1>Bu site nasıl<br /><em>inşa edildi?</em></h1>
          <p>Bir iş başvurusu portfolyosunu “ürün vitrini” gibi değil, Yusuf’un düşünme ve çalışma biçimini hissettiren sıcak bir editoryal alan olarak ele aldım.</p>
          <div className="guide-stack"><span>React 19</span><span>TypeScript</span><span>Three.js</span><span>Motion</span><span>GitHub GraphQL</span><span>GitHub Pages</span></div>
        </section>

        <section className="guide-content">
          <div className="guide-intro surface-panel">
            <span className="guide-intro__number">00</span>
            <div><p className="eyebrow">Temel karar</p><h2>İnsan önce, teknoloji sonra.</h2><p>Yapı teknik olarak güçlü olsa da ziyaretçinin önce bir kişiye ısınması amaçlandı. Bu yüzden sert kartlar, neon çizgiler ve kurumsal SaaS dili yerine organik eğriler, nefes alan boşluk ve kişisel anlatı kullanıldı.</p></div>
          </div>
          <div className="guide-steps">
            {steps.map((step, index) => {
              const Icon = step.icon
              return <article className="guide-step" key={step.title}><div className="guide-step__icon"><Icon /></div><div><span>0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></div></article>
            })}
          </div>
          <div className="guide-note surface-panel">
            <p className="eyebrow">Veri şeffaflığı</p>
            <h2>{githubData.totals.commits} commit ≠ {githubData.totals.contributions} katkı</h2>
            <p>GitHub’ın katkı takvimi commit, issue, pull request ve bazı repo aktivitelerini birlikte sayar. Ana sayfa bu nedenle “{githubData.totals.commits} commit”, “{githubData.totals.repositories} repository” ve “{githubData.totals.contributions} tüm katkılar” sayılarını ayrı gösterir. Tarih aralığı ve güncelleme zamanı da grafiğin altında açıkça yazılır.</p>
            <a className="text-link" href="https://github.com/ddawnlll" target="_blank" rel="noreferrer">Kaynak profili aç <ArrowUpRight size={16} /></a>
          </div>
        </section>
      </main>
      <footer><span>Yusuf Karaca · Yapım notları</span><a href={import.meta.env.BASE_URL}>Portfolyoya dön <ArrowUpRight size={14} /></a></footer>
    </div>
  )
}

import { Link, useRouter } from '@tanstack/react-router';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container, Section } from './primitives';
import { PageHero } from './blocks';
export function ArticleState({ missing = false }: { missing?: boolean }) {
  const router = useRouter();
  return <><PageHero eyebrow="Artigos" title={missing ? 'Artigo não encontrado' : 'Publicações indisponíveis'} lead={missing ? 'Este material não está publicado ou não existe neste endereço.' : 'Não foi possível carregar as publicações. Tente novamente em instantes.'} crumbs={[{ name: 'Início', path: '/' }, { name: 'Artigos', path: '/artigos' }]} /><Section><Container>{missing ? <Button asChild variant="outline"><Link to="/artigos">Ver artigos</Link></Button> : <Button variant="outline" onClick={() => void router.invalidate()}><RefreshCw />Tentar novamente</Button>}</Container></Section></>;
}
export function ArticlesPending() { return <Section><Container><p role="status" className="text-muted-foreground">Carregando publicações…</p></Container></Section>; }

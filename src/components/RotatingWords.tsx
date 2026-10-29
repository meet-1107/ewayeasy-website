/**
 * Swipe-style rotating word: "Make your [sales invoice | e-way bill | …] in one tap".
 * Pure CSS. Screen readers and crawlers get the full sentence; the animated part is decorative.
 * With reduced motion it shows the first word only.
 */
export default function RotatingWords({
  before, words, after, className = '',
}: { before: string; words: string[]; after: string; className?: string }) {
  const n = words.length;
  const step = 100 / n;
  const frames = words
    .map((_, i) => {
      const start = i * step;
      const hold = start + step * 0.8;
      return `${start.toFixed(2)}%,${hold.toFixed(2)}%{transform:translateY(-${(i * 100) / (n + 1)}%)}`;
    })
    .join('');
  const css = `
.ee-rot{display:inline-block;height:1.25em;line-height:1.25em;overflow:hidden;vertical-align:top}
.ee-rot>span{display:flex;flex-direction:column;animation:ee-rot ${n * 2.2}s cubic-bezier(.7,0,.3,1) infinite}
.ee-rot>span>span{height:1.25em;line-height:1.25em;white-space:nowrap}
@keyframes ee-rot{${frames}100%{transform:translateY(-${(n * 100) / (n + 1)}%)}}
@media (prefers-reduced-motion: reduce){.ee-rot>span{animation:none}}
`;
  return (
    <p className={className}>
      <style>{css}</style>
      <span className="sr-only">{`${before} ${words.join(', ')} ${after}`}</span>
      <span aria-hidden>
        {before}{' '}
        <span className="ee-rot">
          <span>
            {[...words, words[0]].map((w, i) => (
              <span key={i} className="text-amber-400 underline decoration-amber-400/40 decoration-4 underline-offset-4">{w}</span>
            ))}
          </span>
        </span>{' '}
        {after}
      </span>
    </p>
  );
}

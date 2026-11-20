// Cosmetic RNG is separate from gameplay and never repeats immediately.
export function actingVariant(previous,random=Math.random){return (previous+1+Math.floor(random()*2))%3;}

export default {
 id: 'math_term',
 title: 'Name a maths term',
 icon: '🔢',
 note: 'Arithmetic, algebra, calculus… Math works too.',
 common: `Addition|Subtraction|Multiplication|Division|Fraction|Decimal|Percentage|Number|Equation|Algebra|Geometry|Calculus|
  Trigonometry|Statistics|Probability|Triangle|Circle|Square|Rectangle|Angle|Area|Volume|Perimeter|Average|Sum|Product|Graph|
  Prime number|Even number|Odd number|Zero|Integer|Variable|Formula|Ratio|Square root|Radius|Diameter|Pi|Infinity|Digit|
  Factor|Multiple|Exponent|Theorem|Median|Mode|Difference|Arithmetic|Line|Point`,
 uncommon: `Quotient|Remainder|Dividend|Divisor|Numerator|Denominator|Hypotenuse|Pythagoras theorem|Polygon|Parallelogram|
  Trapezium|Rhombus|Pentagon|Hexagon|Octagon|Cube|Sphere|Cylinder|Cone|Pyramid|Prism|Circumference|Chord|Arc|Tangent|Sine|
  Cosine|Logarithm|Derivative|Integral|Differentiation|Integration|Limit|Function|Matrix|Vector|Set|Subset|Union|Intersection|
  Venn diagram|Coordinate|Axis|Origin|Slope|Intercept|Parabola|Hyperbola|Ellipse|Polynomial|Quadratic equation|Linear equation|
  Simultaneous equations|Inequality|Absolute value|Factorial|Permutation|Combination|Sequence|Series|Arithmetic progression|
  Geometric progression|LCM|HCF|Rational number|Irrational number|Real number|Natural number|Whole number|Negative number|
  Positive number|Composite number|Square number|Cube root|Bisector|Perpendicular|Parallel|Acute angle|Obtuse angle|Right angle|
  Reflex angle|Straight angle|Complementary angles|Supplementary angles|Vertex|Edge|Face|Symmetry|Congruence|Similarity|
  Simple interest|Compound interest|Profit and loss|Discount|Estimation|Rounding|Place value|Number line|Range|
  Standard deviation|Histogram|Bar graph|Pie chart|Line graph|Coefficient|Constant|Expression|Proof|Quadrilateral|
  Equilateral triangle|Isosceles triangle|Scalene triangle|Right triangle|Semicircle|Degree|Diagonal|Reciprocal|Mixed fraction|
  Improper fraction|Proper fraction|Proportion|BODMAS|Long division|Times table|Fibonacci sequence|Golden ratio|Roman numerals|
  Cuboid|Complex number|Imaginary number|Binomial theorem|Reflection|Rotation|Translation`,
 rare: `Asymptote|Eigenvalue|Eigenvector|Determinant|Inverse|Transpose|Binomial|Monomial|Trinomial|Natural logarithm|
  Exponential function|Euler's number|Pascal's triangle|Prime factorization|Sieve of Eratosthenes|Euclidean algorithm|
  Modular arithmetic|Number theory|Topology|Group theory|Vector space|Linear algebra|Differential equation|Partial derivative|
  Fourier series|Fourier transform|Laplace transform|Taylor series|Maclaurin series|Convergence|Divergence|Continuity|
  Chain rule|Product rule|Quotient rule|L'Hôpital's rule|Mean value theorem|Fundamental theorem of calculus|Riemann sum|
  Definite integral|Indefinite integral|Antiderivative|Maxima|Minima|Inflection point|Domain|Codomain|Bijection|Injection|
  Surjection|Relation|Cartesian product|Power set|Empty set|Universal set|Complement|Fractal|Mandelbrot set|Möbius strip|
  Tessellation|Platonic solid|Tetrahedron|Octahedron|Dodecahedron|Icosahedron|Polyhedron|Torus|Hemisphere|Frustum|Locus|
  Centroid|Circumcentre|Incentre|Orthocentre|Altitude|Cyclic quadrilateral|Secant|Cosecant|Cotangent|Unit circle|Radian|
  Polar coordinates|Cartesian coordinates|Conic section|Eccentricity|Normal distribution|Binomial distribution|
  Poisson distribution|Correlation|Regression|Outlier|Quartile|Percentile|Interquartile range|Box plot|Scatter plot|Sample|
  Variance|Frequency|Null hypothesis|P-value|Confidence interval|Expected value|Random variable|Bayes' theorem|
  Conditional probability|Combinatorics|Graph theory|Game theory|Set theory|Boolean algebra|Truth table|Mathematical induction|
  Proof by contradiction|Pigeonhole principle|Perfect number|Mersenne prime|Twin primes|Goldbach conjecture|
  Fermat's Last Theorem|Riemann hypothesis|Collatz conjecture|Four color theorem|Euler's identity|Pythagorean triple|Googol|
  Googolplex|Significant figures|Scientific notation|Equivalent fractions|Recurring decimal|Surd|Rationalisation|
  Inverse proportion|Unitary method|Tally marks|Geometric mean|Harmonic mean|Weighted average|Harmonic progression|Scalar|
  Dot product|Cross product|Quadratic formula|Discriminant|Completing the square|Factorisation|Cosine rule|Sine rule|
  Heron's formula|Axiom|Lemma|Corollary|Conjecture|Identity|Term|Transversal|Sector|Segment|Kite|Transformation|Enlargement|
  Vedic mathematics|Numeral`,
 deep: `Tensor|Quaternion|Manifold|Homeomorphism|Isomorphism|Homomorphism|Abelian group|Galois theory|Lie group|Hilbert space|
  Banach space|Measure theory|Lebesgue integral|Jacobian|Hessian|Wronskian|Gamma function|Zeta function|Bernoulli numbers|
  Catalan numbers|Euler's totient function|Chinese remainder theorem|Diophantine equation|Pell's equation|Continued fraction|
  Transcendental number|Algebraic number|Cardinal number|Ordinal number|Cardinality|Aleph-null|Infinitesimal|Cauchy sequence|
  Monte Carlo method|Markov chain|Stochastic process|Linear programming|Simplex method|Lagrange multiplier|Newton's method|
  Numerical analysis|Interpolation|Extrapolation|Bisection method|Trapezoidal rule|Simpson's rule|Klein bottle|Directrix|
  Latus rectum|Hyperbolic function|Laplacian|Curl|Shoelace formula|Ptolemy's theorem|Ceva's theorem|Menelaus' theorem|
  Thales' theorem|Nine-point circle|Euler line|Simson line|Vinculum|Additive inverse|Like terms|Ring|Field|Mapping|
  Standard error|Hypothesis test`,
 aliases: {
  'Add': 'Addition', 'Adding': 'Addition', 'Plus': 'Addition', 'Subtract': 'Subtraction', 'Minus': 'Subtraction',
  'Multiply': 'Multiplication', 'Times': 'Multiplication', 'Divide': 'Division', 'Percent': 'Percentage', 'Mean': 'Average',
  'Arithmetic mean': 'Average', 'Prime': 'Prime number', 'Primes': 'Prime number', 'Sq root': 'Square root', 'Root': 'Square root',
  'Radii': 'Radius', 'Infinite': 'Infinity', 'Power': 'Exponent', 'Index': 'Exponent', 'Indices': 'Exponent', 'Exponentiation': 'Exponent',
  'Pythagorean theorem': 'Pythagoras theorem', 'Pythagoras': 'Pythagoras theorem', 'Trapezoid': 'Trapezium',
  'Sin': 'Sine', 'Cos': 'Cosine', 'Tan': 'Tangent', 'Log': 'Logarithm', 'dy/dx': 'Derivative', 'Matrices': 'Matrix', 'Venn': 'Venn diagram',
  'Coordinates': 'Coordinate', 'Axes': 'Axis', 'X-axis': 'Axis', 'Y-axis': 'Axis', 'Gradient': 'Slope', 'Quadratic': 'Quadratic equation',
  'Simultaneous equation': 'Simultaneous equations', 'System of equations': 'Simultaneous equations', 'Modulus': 'Absolute value',
  'nPr': 'Permutation', 'nCr': 'Combination', 'AP': 'Arithmetic progression', 'GP': 'Geometric progression',
  'Lowest common multiple': 'LCM', 'Least common multiple': 'LCM', 'GCD': 'HCF', 'GCF': 'HCF',
  'Highest common factor': 'HCF', 'Greatest common divisor': 'HCF', 'Greatest common factor': 'HCF',
  'Perfect square': 'Square number', 'Perpendicular bisector': 'Bisector', 'Angle bisector': 'Bisector', 'Parallel lines': 'Parallel',
  'Complementary angle': 'Complementary angles', 'Supplementary angle': 'Supplementary angles', 'Vertices': 'Vertex',
  'Line of symmetry': 'Symmetry', 'Congruent': 'Congruence', 'Similar triangles': 'Similarity', 'Rounding off': 'Rounding',
  'SD': 'Standard deviation', 'Bar chart': 'Bar graph', 'Pie graph': 'Pie chart', 'Circle graph': 'Pie chart', 'Algebraic expression': 'Expression',
  'Equilateral': 'Equilateral triangle', 'Isosceles': 'Isosceles triangle', 'Scalene': 'Scalene triangle', 'Right-angled triangle': 'Right triangle',
  'Multiplicative inverse': 'Reciprocal', 'Mixed number': 'Mixed fraction', 'Direct proportion': 'Proportion', 'Direct variation': 'Proportion',
  'PEMDAS': 'BODMAS', 'BIDMAS': 'BODMAS', 'Order of operations': 'BODMAS', 'Multiplication table': 'Times table', 'Tables': 'Times table',
  'Fibonacci': 'Fibonacci sequence', 'Fibonacci numbers': 'Fibonacci sequence', 'Fibonacci series': 'Fibonacci sequence',
  'Phi': 'Golden ratio', 'Golden mean': 'Golden ratio', 'Golden section': 'Golden ratio', 'Roman numeral': 'Roman numerals',
  'Rectangular prism': 'Cuboid', 'Iota': 'Imaginary number', 'Binomial expansion': 'Binomial theorem',
  'Inverse matrix': 'Inverse', 'Inverse function': 'Inverse', 'Ln': 'Natural logarithm', 'Natural log': 'Natural logarithm', 'E': "Euler's number",
  'Prime factorisation': 'Prime factorization', 'Euclid algorithm': 'Euclidean algorithm', 'Modulo': 'Modular arithmetic',
  'Clock arithmetic': 'Modular arithmetic', 'Taylor expansion': 'Taylor series', "L'Hospital's rule": "L'Hôpital's rule",
  'Maximum': 'Maxima', 'Minimum': 'Minima', 'Point of inflection': 'Inflection point', 'One-to-one correspondence': 'Bijection',
  'One-to-one function': 'Injection', 'Onto function': 'Surjection', 'Null set': 'Empty set', 'Mandelbrot': 'Mandelbrot set',
  'Moebius strip': 'Möbius strip', 'Platonic solids': 'Platonic solid', 'Polyhedra': 'Polyhedron', 'Loci': 'Locus',
  'Circumcenter': 'Circumcentre', 'Incenter': 'Incentre', 'Orthocenter': 'Orthocentre', 'Sec': 'Secant', 'Cosec': 'Cosecant',
  'Csc': 'Cosecant', 'Cot': 'Cotangent', 'Polar coordinate': 'Polar coordinates', 'Cartesian coordinate': 'Cartesian coordinates',
  'Cartesian plane': 'Cartesian coordinates', 'Conic': 'Conic section', 'Bell curve': 'Normal distribution',
  'Gaussian distribution': 'Normal distribution', 'IQR': 'Interquartile range', 'Box and whisker plot': 'Box plot',
  'Scatter graph': 'Scatter plot', 'Scatter diagram': 'Scatter plot', 'Expectation': 'Expected value', 'Bayes rule': "Bayes' theorem",
  'Induction': 'Mathematical induction', 'Proof by induction': 'Mathematical induction', 'Twin prime': 'Twin primes',
  "Goldbach's conjecture": 'Goldbach conjecture', 'FLT': "Fermat's Last Theorem", 'Four colour theorem': 'Four color theorem',
  'Significant figure': 'Significant figures', 'Sig figs': 'Significant figures', 'Standard form': 'Scientific notation',
  'Equivalent fraction': 'Equivalent fractions', 'Repeating decimal': 'Recurring decimal', 'Rationalization': 'Rationalisation',
  'Inverse variation': 'Inverse proportion', 'Tally': 'Tally marks', 'Tally mark': 'Tally marks', 'HP': 'Harmonic progression',
  'Scalar product': 'Dot product', 'Vector product': 'Cross product', 'Sridharacharya formula': 'Quadratic formula',
  'Shridharacharya formula': 'Quadratic formula', 'Factorization': 'Factorisation', 'Factoring': 'Factorisation',
  'Law of cosines': 'Cosine rule', 'Law of sines': 'Sine rule', "Hero's formula": "Heron's formula", 'Postulate': 'Axiom',
  'Vedic maths': 'Vedic mathematics', 'Vedic math': 'Vedic mathematics',
  'Totient': "Euler's totient function", "Euler's phi function": "Euler's totient function", 'CRT': 'Chinese remainder theorem',
  'Aleph-zero': 'Aleph-null', 'Monte Carlo': 'Monte Carlo method', 'Newton-Raphson method': "Newton's method",
  'Bernoulli number': 'Bernoulli numbers', 'Catalan number': 'Catalan numbers', 'Riemann zeta function': 'Zeta function',
  'Hypothesis testing': 'Hypothesis test'
 }
};

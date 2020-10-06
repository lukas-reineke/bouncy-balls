
# Balls

Watch Javascript "AI" learn how to launch balls into a target.

[balls.lukas-reineke.com](https://balls.lukas-reineke.com)

<img src="https://i.imgur.com/MA1jj5p.gif" alt="balls" />

## how does it work?

A set of balls start out with random velocity and vector.
Each iteration each ball gets a score based on how close and fast it got to
the target. In the next iteration the new set of balls are generated based on
the old generation. The balls with a better score have a higher change of making
it into the new generation.
To have chance of optimisation, a small percentage of each generation is random.

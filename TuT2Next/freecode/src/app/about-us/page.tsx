import { FC } from "react";

interface pageProps{}

const page: FC<pageProps> = ({}) => {

  return(
    <div>
      <h1>About us Page</h1>
      <p>Hello. We are a soap production factory that uses the latest AI models to optimise our amount clean surface <br/>
      per density of soap. Our team consists of 99 % suboptimal neurotic neural networks that work 48 hours per day to come up with recipes and <br/>
      production methods for our soap bars. The latest product is a coffe-cacti that boosts your immune system and massages your feet <br/>
      with its cooked-in pins. The AI has estimated an above 62 % satisfaction rate for ladies over 60 just for this bar alone.</p>
    </div>
  )
}

export default page;
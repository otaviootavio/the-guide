import OzoList from './OzoList';

export default function HeaderComponent({onezerooneList}){
  return <div>
    <h3>The Engineer&apos;s guide to blockchain</h3>
    <p>We help undergrad students to <mark>learn</mark> blockchain</p>
    <br />
    <h1>Learning paths</h1>
    <OzoList markdownList={onezerooneList} />
    {/* <div>
      Learn about <b>research</b> or about <b>web development</b>
      <section>
        <aside>
          <BiCodeBlock size={100} />
          <h3>Beginner</h3>
          <p>So you wanna <mark>build</mark> on web3? Learn blockchain concepts while build on it!</p>
          <p><small>If you like getting your hands dirty, this is for you</small></p>
        </aside>
      </section>
      <section>
        <aside>
          <HiAcademicCap size={100} />
          <h3>Academic</h3>
          <p>Wanna <mark>read</mark> more articles and papers? Read papers and see what will be build in the next years!</p>
          <p><small>We will focus more on understand than actualy build</small></p>
        </aside>
      </section>
      <section>
        <aside>
          <BiCodeBlock size={100} />
          <h3>Developer</h3>
          <p>So you wanna <mark>build</mark> on web3? Learn blockchain concepts while build on it!</p>
          <p><small>If you like getting your hands dirty, this is for you</small></p>
        </aside>
      </section>
    </div> */}
  </div>;
}

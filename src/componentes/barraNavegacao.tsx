/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css";

type Props = {
  tema: string;
  botoes: string[];
  seletorView: (tela: string, evento?: React.MouseEvent) => void;
};

export default function BarraNavegacao({ tema, botoes, seletorView }: Props) {
  useEffect(() => {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  }, []);

  const gerarListaBotoes = () => {
    return botoes.map((botao) => (
      <li key={botao}>
        <a onClick={(e) => seletorView(botao, e)}>{botao}</a>
      </li>
    ));
  };

  return (
    <>
      <nav className={tema}>
        <div className="nav-wrapper">
          <a className="brand-logo" style={{ marginLeft: "10px" }}>
            WB
          </a>
          <a data-target="mobile-menu" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">{gerarListaBotoes()}</ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-menu">
        {gerarListaBotoes()}
      </ul>
    </>
  );
}

async function pageTransition(data, done) {
  const tl = gsap.timeline();
  const currentNamespace = data.current.namespace;
  const nextNamespace = data.next.namespace;

  if (nextNamespace.includes("transition")) {
    const selector = nextNamespace.includes("one")
      ? ".section-1"
      : ".section-2";

    tl.set(selector + " .section__text", {
      opacity: 0,
    });
    tl.to(selector + " .section__image--container", {
      width: "100%",
      duration: 1,
    });
    tl.to(
      selector + " .section__image",
      {
        aspectRatio: 2.8,
        duration: 1,
        onComplete: done,
      },
      "0"
    );
    tl.to(selector + " .section__text", { width: "0%" }, "0");
  }

  if (nextNamespace == "home") {
    tl.to("#transition-one", {
      opacity: 0,
      duration: 0.6,
      onComplete: done,
    });
  }
}

function contentAnimation(data) {
  let tl = gsap.timeline();
  if (data.next.namespace == "home") {
    tl.from("#home .section__text", {
      opacity: 0,
      y: 40,
      duration: 0.6,
    });

    tl.to(
      "#home .section__image",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.3,
      },
      "-=0.2"
    );
  }
  if (data.next.namespace.includes("transition")) {
    tl.from("#transition-one .banner__text", {
      opacity: 0,
      duration: 1,
      delay: data.current.container ? 1 : 0.5,
    });
  }
}

barba.init({
  transitions: [
    {
      sync: true,
      // name: "default-transition",
      async leave(data) {
        const done = this.async();

        pageTransition(data, done);
        console.log("leave", data);
      },
      async enter(data) {
        console.log("enter", data);
        contentAnimation(data);
      },
      async once(data) {
        contentAnimation(data);
      },
    },
  ],
});

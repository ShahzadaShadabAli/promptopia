import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/global.css"

export const metadata = {
    title:"Promptopia",
    description: "Discover & Share AI Prompts"
}

const layout = ({children}) => {
    return (
        <html>
            <head>
                <link rel="icon" href="/assets/images/logo.svg" />
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body>
            <Provider>
                <div className="main">
                    <div className="gradient"></div>
                </div>
                <main className="app">
                <Nav />
                    {children}
                </main>
            </Provider>
            </body>
        </html>
    );
}
 
export default layout;
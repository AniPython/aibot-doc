# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information
import os
import sys

project = 'Aibote'
copyright = '2023, Aibote'
author = 'AniPython'
release = ''

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.autosummary',
    'sphinx.ext.duration',
    'sphinx_copybutton',  # sphinx-copybutton
    'sphinx_tabs.tabs',  # sphinx-tabs
    'sphinx_togglebutton',  # sphinx-togglebutton
    'myst_nb',  # parse .md and .ipynb  myst-nb
    'sphinx_jinja',  # sphinx-jinja
    'sphinx_js',  # sphinx-js  + npm install -g jsdoc
]

source_path = os.path.dirname(os.path.abspath(__file__))
# sys.path.insert(0, os.path.join(source_path, 'scripts/py'))
sys.path.insert(0, '/Users/yi/aibote/AiBot')
templates_path = ['_templates']
exclude_patterns = ["_build", "Thumbs.db", ".DS_Store", "**.ipynb_checkpoints"]

language = 'zh_CN'

# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output
html_theme = 'pydata_sphinx_theme'  # alabaster(默认), furo, pydata_sphinx_theme
html_static_path = ['_static']

# 配置 copybutton 扩展
copybutton_prompt_text = "$ "
copybutton_prompt_is_regexp = False
copybutton_selector = "div.highlight pre"

source_suffix = ['.rst']

# html_context = {
#
# }
#


html_css_files = [
    # "css/theme_overrides.css",
]

html_theme_options = {
    "show_nav_level": 2,
    "header_links_before_dropdown": 7,
    # "secondary_sidebar_items": ["page-toc.html"],
    # "navbar_end": [
    #     # "navbar-icon-links.html",
    #     # "search-field.html",
    # ]
}

# html_sidebars = {
#     "**": ["sidebar-nav-bs.html", "sidebar-ethical-ads.html"]
# }

# source_encoding = "utf-8"
# html_show_source_links = False

# parse js
js_source_path = './scripts/js'
# jsdoc_config_path = './conf_js.json'
# primary_domain = 'js'